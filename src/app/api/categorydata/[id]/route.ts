import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No category with ID found";
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const category = await prisma.categoryData.findUnique({
        where: {
            id,
        },
    });

    if (!category) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(category);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    let json = await request.json();

    const updated_category = await prisma.categoryData.update({
        where: { id },
        data: json,
    });

    if (!updated_category) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(updated_category);
}