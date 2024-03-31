import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {Category, OneCategoryHasManyValues, Prisma, Value} from "@prisma/client";
import {EMethod, postData} from "../../utils";

const _404 = "No category with ID found";

export async function GET(request: Request) {
    const categories: Array<Category> = await prisma.category.findMany({
        where: { deletedAt: null }
    });
    return NextResponse.json(categories);
}


export async function POST(request: Request) {
    try {
        const json = await request.json();

        const newCategory: Category = json.category;
        const createdCategory: Category = await prisma.category.create({
            data: {name: newCategory.name},
        });

        for (let i = 0; i < json.values.length; i++) {
            const value = json.values[i];
            const createdCategoryValue: Value = await prisma.value.create({
                data: {name: value.name}
            })
            const createdOneCategoryHasManyCategoryValues: OneCategoryHasManyValues = await prisma.oneCategoryHasManyValues.create({
                data: {categoryId: createdCategory.id, valueId: createdCategoryValue.id}
            })
        }

        return new NextResponse(JSON.stringify(createdCategory), {
            status: 201,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, {status: 500});
    }
}

export async function PATCH(request: Request) {
    try {
        const json = await request.json();
        let updateCategory: Category | null = null;

        const categoryFromUI: Category = json.category;
        const valuesFromUI: Array<Value> = json.values;
        const valuesIdFromUI: Array<string> = valuesFromUI.map(m => m.id);

        const hasRelations: Array<OneCategoryHasManyValues> = await prisma.oneCategoryHasManyValues.findMany({
            where: {categoryId: categoryFromUI.id}
        })
        const hasRelationsValueId: Array<string> = hasRelations.map(m => m.valueId);
        const valuesToDelete: Array<string> = hasRelationsValueId.filter(f => !valuesIdFromUI.includes(f));
        const valuesToAdd: Array<Value> = valuesFromUI.filter(v => !valuesToDelete.includes(v.id) && !hasRelationsValueId.includes(v.id));

        await prisma.$transaction(async (tx) => {
            if (valuesToDelete.length > 0) {
                const deletedHasRelationsRes = await tx.oneCategoryHasManyValues.deleteMany({
                    where: {
                        categoryId: categoryFromUI.id,
                        valueId: {in: valuesToDelete}
                    }
                });
            }

            const deletedAtValue = new Date();
            const deleteValuesRes = await tx.value.updateMany({
                where: {
                    id: {in: valuesToDelete},
                },
                data: {
                    deletedAt: deletedAtValue
                }
            })

            for (let i = 0; i < valuesToAdd.length; i++) {
                const valueToAdd:Value = valuesToAdd[i];
                const valueAddRes:Value = await tx.value.create({
                    data: {name: valueToAdd.name }
                })
                const addRelationsRes = await tx.oneCategoryHasManyValues.create({
                    data: {categoryId: categoryFromUI.id, valueId: valueAddRes.id}
                })
            } // end for i

            updateCategory = await tx.category.update({
                where: {id: categoryFromUI.id},
                data: {
                    name: categoryFromUI.name
                }
            });

            const categoryHistoryRes = await tx.categoryHistory.create({
                data: {
                    categoryId: updateCategory?.id,
                    name: updateCategory?.name,
                    updatedAt: updateCategory?.updatedAt
                }
            });
            console.log( categoryHistoryRes );

        }, {
            maxWait: 20000, // default: 2000
            timeout: 50000, // default: 5000
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
        });

        return new NextResponse(JSON.stringify(updateCategory), {
            status: 201,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, {status: 500});
    }
}

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const categoryId: string = json.id;

    try {

        const _oneCategoryHasManyValues = await prisma.oneCategoryHasManyValues.findMany({
            where: {
                categoryId: categoryId
            }
        })

        const res1 = await prisma.oneCategoryHasManyValues.deleteMany({
            where: {
                categoryId: categoryId
            }
        })

        const valueIdArr: Array<string> = _oneCategoryHasManyValues.map(m => m.valueId);

        const res2 = await prisma.oneTemplateHasManyValues.deleteMany({
            where: {
                valueId: {
                    in: valueIdArr
                }
            }
        })

        const deletedAt = new Date();
        const res3 = await prisma.value.updateMany({
            where: {
                id: {
                    in: valueIdArr
                }
            },
            data: {
                deletedAt: deletedAt
            }
        })

        const res4 = await prisma.category.update({
            where: {id: categoryId},
            data: {deletedAt: deletedAt}
        });

        return new NextResponse(null, {status: 204});
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, {status: 404});
        }

        return new NextResponse(error.message, {status: 500});
    }
}