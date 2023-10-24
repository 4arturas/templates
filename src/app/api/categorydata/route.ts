import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category, CategoryValue, OneCategoryHasManyCategoryValues, Prisma} from "@prisma/client";
import OneCategoryHasManyCategoryValuesScalarFieldEnum = Prisma.OneCategoryHasManyCategoryValuesScalarFieldEnum;

const _404 = "No category with ID found";

export async function GET(request: Request) {
    const categories = await prisma.category.findMany();
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
