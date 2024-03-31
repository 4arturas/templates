import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Value} from "@prisma/client";

const _404 = "No category with ID found";

export async function GET(
    request: Request,
    { params }: { params: { categoryId: string } }
) {
    const categoryId = params.categoryId;
    const categoryHasCategoryValue = await prisma.oneCategoryHasManyValues.findMany({
        where: {
            categoryId: { in: [categoryId] },
        }
    })
    const categoryDataIdArr: Array<string> = categoryHasCategoryValue.map( c => c.valueId );
    const categoryDataArr = await prisma.value.findMany({
        where: {
            id: { in: categoryDataIdArr },
        }
    })

    if (!categoryDataArr) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(categoryDataArr);
}