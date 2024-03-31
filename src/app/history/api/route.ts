import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {EMethod, postData} from "../../utils";
import {Category} from "@prisma/client";

const _404 = "No category with ID found";

export async function GET(request: Request) {
    const histories: Array<any> = await prisma.history.findMany({
    });
    return NextResponse.json(histories);
}