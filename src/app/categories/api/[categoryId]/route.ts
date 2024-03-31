import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category} from "@prisma/client";

const _404 = "No category with ID found";

export async function GET(
    request: Request,
    { params }: { params: { categoryId: string } }
) {
    const categoryId = params.categoryId;
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        },
    });

    if (!category) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(category);
}