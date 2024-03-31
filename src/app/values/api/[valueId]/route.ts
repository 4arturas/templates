import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Value} from "@prisma/client";

const _404 = "No category with ID found";

export async function GET(
    request: Request,
    { params }: { params: { valueId: string } }
) {
    const valueId = params.valueId;
    const value = await prisma.value.findFirst( {
        where: { id: valueId }
    })

    if (!value) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(value);
}