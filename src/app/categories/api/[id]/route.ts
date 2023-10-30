import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category} from "@prisma/client";

const _404 = "No category with ID found";

export const getCategoryApi = (async (id: string): Promise<Category> => {
    return fetch(`http://localhost:3000/categories/api/${id}`).then((res) => res.json())
})

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    });

    if (!category) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(category);
}