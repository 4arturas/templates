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
            categoryId: { in: [categoryId] },
        }
    })
    const categoryDataIdArr: Array<string> = categoryHasCategoryValue.map( c => c.categoryDataId );
    const categoryDataArr = await prisma.categoryValue.findMany({
        where: {
            id: { in: categoryDataIdArr },
        }
    })

    if (!categoryDataArr) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(categoryDataArr);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    let json = await request.json();

    const updated_category = await prisma.category.update({
        where: { id },
        data: json,
    });

    if (!updated_category) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(updated_category);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        await prisma.category.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}