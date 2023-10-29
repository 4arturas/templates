import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category, OneCategoryHasManyValues, Value} from "@prisma/client";

const _404 = "No category with ID found";


export const getCategoryApi = (async (id: string): Promise<Category> => {
    const item = fetch(`http://localhost:3000/categories/api/${id}`).then((res) => res.json())
    return item
})
export async function GET(request: Request) {
    const categories:Array<Category> = await prisma.category.findMany();
    return NextResponse.json(categories);
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

export const deleteCategory = (async (id: string) => {
    const data = {id: id};
    const response = await fetch('http://localhost:3000/categories/api', {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
})
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