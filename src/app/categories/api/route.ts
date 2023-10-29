import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category, CategoryValue, OneCategoryHasManyCategoryValues} from "@prisma/client";

const _404 = "No category with ID found";

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
            const createdCategoryValue: CategoryValue = await prisma.categoryValue.create({
                data: newCategoryValue
            })
            const createdOneCategoryHasManyCategoryValues: OneCategoryHasManyCategoryValues =  await prisma.oneCategoryHasManyCategoryValues.create({
                data: { categoryId: createdCategory.id, categoryDataId: createdCategoryValue.id }
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

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const categoryId:string = json.id;

    try {

        const categoryValueIdArr = await prisma.oneCategoryHasManyCategoryValues.findMany({
            where: {
                categoryId: categoryId
            }
        })

        const res1 = await prisma.oneCategoryHasManyCategoryValues.deleteMany({
            where: {
                categoryId: categoryId
            }
        })

        const valueIdArr = categoryValueIdArr.map( m => m.id );
        const res2 = await prisma.oneTemplateHasManyCategoryValues.deleteMany({
            where: {
                categoryValueId: {
                    in: valueIdArr
                }
            }
        })

        const res3 = await prisma.categoryValue.deleteMany({
            where: {
                id: { in: valueIdArr }
            }
        })

        const res4 = await prisma.oneTemplateHasManyCategoryValues.deleteMany({
            where: {
                categoryId: categoryId
            }
        })

        await prisma.category.delete({
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