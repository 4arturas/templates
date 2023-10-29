import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No category with ID found";
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const categoryId = params.id;
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