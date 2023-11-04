import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {ITemplateResponse} from "@/app/utils";

const _404 = "No template with ID found";
export const getTemplateWithCategoryValues = (async (templateId: string): Promise<ITemplateResponse> => {
    const item = fetch(`http://localhost:3000/templates/api/template/${templateId}/withcategoryvalues`).then((res) => res.json())
    return item
})
export async function GET(
    request: Request,
    { params }: { params: { templateId: string } }
) {
    const templateId = params.templateId;
    const template = await prisma.template.findFirst({
        where: {
          id: templateId
        },
        select: {
            id: true,
            name: true,
            to: true,
            subject: true,
            icon: true,
            templateText: true,
            OneTemplateHasManyValues: {
                select: {
                    values: {
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

    if (!template) {
        return new NextResponse(_404, { status: 404 });
    }

    return NextResponse.json(template);
}