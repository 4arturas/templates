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