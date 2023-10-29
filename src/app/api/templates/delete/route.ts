import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { OneTemplateHasManyCategoryValues} from "@prisma/client";

const _404 = "No Template with ID found";

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const templateId:string = json.id;

    try {
        const templateHasCategoryValuesArr:Array<OneTemplateHasManyCategoryValues> = await prisma.oneTemplateHasManyCategoryValues.findMany({
            where: { templateId: templateId }
        });

        const oneTemplateHasManyCategoryValuesIdArr: Array<string> = templateHasCategoryValuesArr.map( (m) => m.id );
        await prisma.oneTemplateHasManyCategoryValues.deleteMany({
            where: {
                id: {
                    in: oneTemplateHasManyCategoryValuesIdArr
                }
            }
        });

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