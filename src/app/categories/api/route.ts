import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {Category, OneCategoryHasManyValues, Value} from "@prisma/client";
import {EMethod, postData} from "@/app/utils";

const _404 = "No category with ID found";

export async function getCategoriesApi(): Promise<Array<Category>> {
    return fetch(`http://localhost:3000/categories/api`).then((res) => res.json())
}
export async function GET(request: Request) {
    const categories:Array<Category> = await prisma.category.findMany();
    return NextResponse.json(categories);
}

export const createCategoryApi = async (name: string, categoryData: Array<string>) => {
    const data = { name: name, categoryData: categoryData };
    return postData('http://localhost:3000/categories/api', EMethod.POST, data );
}
export async function POST(request: Request) {
    try {
        const json = await request.json();

        const newCategory: any = { name: json.name };
        const createdCategory: Category = await prisma.category.create({
            data: newCategory,
        });

        for ( let i = 0; i < json.categoryData.length; i++ ) {
            const newCategoryValue: { name: string } = { name: json.categoryData[i] };
            const createdCategoryValue: Value = await prisma.value.create({
                data: newCategoryValue
            })
            const createdOneCategoryHasManyCategoryValues: OneCategoryHasManyValues =  await prisma.oneCategoryHasManyValues.create({
                data: { categoryId: createdCategory.id, valueId: createdCategoryValue.id }
            })
        }

        return new NextResponse(JSON.stringify(createdCategory), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, { status: 500 });
    }
}
export const deleteCategoryApi = (id: string)  => {
    const data = {id: id};
    return postData( 'http://localhost:3000/categories/api', EMethod.DELETE, data );
}
export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const categoryId:string = json.id;

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

        const valueIdArr:Array<string> = _oneCategoryHasManyValues.map( m => m.valueId );

        const res2 = await prisma.oneTemplateHasManyValues.deleteMany({
            where: {
                valueId: {
                    in: valueIdArr
                }
            }
        })

        const res3 = await prisma.value.deleteMany({
            where: {
                id: {
                    in: valueIdArr
                }
            }
        })

        const res4 = await prisma.category.delete({
            where: { id: categoryId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}