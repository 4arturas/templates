import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
    CategoryValue,
    OneCategoryHasManyCategoryValues,
    OneTemplateHasManyCategoryValues
} from "@prisma/client";

export async function GET(request: Request) {

    const templates = await prisma.template.findMany({
        select: {
            id: true,
            name: true,
            to: true,
            subject: true,
            icon: true,
            OneTemplateHasManyCategoryValues: {
                select: {
                    categoryValue: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })

    return NextResponse.json(templates);
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        const template = await prisma.template.create({
            data: { name: json.name, subject: json.subject, to: json.to, icon: json.icon, templateText: json.templateText },
        });

        for ( let i = 0; i < json.categoryValueIdArr.length; i++ ) {
            const categoryId:string = json.categoryValueIdArr[i].categoryId;
            const categoryValueId:string = json.categoryValueIdArr[i].categoryValueId;
            const templateHasCategoryValue: OneTemplateHasManyCategoryValues = await prisma.oneTemplateHasManyCategoryValues.create({
                data: { templateId: template.id, categoryId: categoryId, categoryValueId: categoryValueId }
            })
            console.log( templateHasCategoryValue );
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