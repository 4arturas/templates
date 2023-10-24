import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Prisma, OneTemplateHasManyCategories} from "@prisma/client";

const _404 = "No Template with ID found";

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const templateId:string = json.id;

    try {
        const templateHasCategoryArr:Array<OneTemplateHasManyCategories> = await prisma.oneTemplateHasManyCategories.findMany({
            where: { templateId: templateId }
        });

        const templateHasCategoryIdArr:Array<string> = templateHasCategoryArr.map( (t:OneTemplateHasManyCategories) => t.id );
        templateHasCategoryIdArr.map( async (id:string) => {
            await prisma.oneTemplateHasManyCategories.delete({ where: {id: id } });
        })

        await prisma.template.delete({
            where: { id: templateId }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}