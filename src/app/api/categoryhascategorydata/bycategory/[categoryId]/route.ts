import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No category with ID found";
export async function GET(
    request: Request,
    { params }: { params: { categoryId: string } }
) {
    const categoryId = params.categoryId;
    const categoryHasCategoryData = await prisma.categoryHasCategoryData.findMany({
        where: {
            categoryId: categoryId
        },
    });

    if (!categoryHasCategoryData) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(categoryHasCategoryData);
}