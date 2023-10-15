import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No template with ID found";
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const template = await prisma.template.findUnique({
        where: {
            id,
        },
    });

    if (!template) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(template);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    let json = await request.json();

    const updated_template = await prisma.template.update({
        where: { id },
        data: json,
    });

    if (!updated_template) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(updated_template);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        await prisma.template.delete({
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