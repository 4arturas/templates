import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Value} from "@prisma/client";

const _404 = "No category with ID found";

export const getValueApi = (async (valueId: string): Promise<Value> => {
    return fetch(`http://localhost:3000/values/api/${valueId}`).then((res) => res.json())
})
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