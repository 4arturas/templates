import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No category with ID found";
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