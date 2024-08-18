import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const histories: Array<any> = await prisma.history.findMany({
    });
    return NextResponse.json(histories);
}