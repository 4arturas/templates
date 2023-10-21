import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No categories found";
export async function GET(
    request: Request,
    { params }: { params: { templateId: string } }
) {
    const templateId = params.templateId;
    const template = await prisma.template.findUnique({
        where: {
            id: templateId,
        },
    });

    const templateHasCategoryArr = await prisma.templateHasCategory.findMany({
        where: {
            templateId: templateId
        }
    })
    const categoryIdArr:Array<string> = templateHasCategoryArr.map( t => t.categoryId );

    const categories = await prisma.category.findMany({
        where: {
            id: { in: categoryIdArr },
        }
    })

    if (!categories) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(categories);
}