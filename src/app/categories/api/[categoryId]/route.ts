import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category} from "@prisma/client";

const _404 = "No category with ID found";


export const getCategoryApi = (async (categoryId: string): Promise<Category> => {
    return fetch(`http://localhost:3000/categories/api/${categoryId}`).then((res) => res.json())
})
export async function GET(
    request: Request,
    { params }: { params: { categoryId: string } }
) {
    const categoryId = params.categoryId;
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
            deletedAt: null
        },
    });

    if (!category) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(category);
}