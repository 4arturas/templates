import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No category with ID found";
export async function GET(
    request: Request,
    { params }: { params: { categoryId: string } }
) {
    const categoryId = params.categoryId;
    const categoryHasCategoryValue = await prisma.oneCategoryHasManyCategoryValues.findMany({
        where: {
            categoryId: categoryId
        },
    });

    if (!categoryHasCategoryValue) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(categoryHasCategoryValue);
}