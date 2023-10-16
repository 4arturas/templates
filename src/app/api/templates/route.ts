import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {CategoryData, CategoryHasCategoryData, TemplateHasCategory} from "@prisma/client";

export async function GET(request: Request) {
    const templates = await prisma.template.findMany();
    return NextResponse.json(templates);
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        const template = await prisma.template.create({
            data: { name: json.name },
        });

        for ( let i = 0; i < json.categoryArr.length; i++ ) {
            const categoryId = json.categoryArr[i];
            const templateHasCategory: TemplateHasCategory = await prisma.templateHasCategory.create({
                data: { templateId: template.id, categoryId: categoryId }
            })
        }

        return new NextResponse(JSON.stringify(template), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, { status: 500 });
    }
}