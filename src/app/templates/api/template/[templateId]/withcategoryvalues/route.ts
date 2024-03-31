import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {convert, IDBTemplateWithCategoriesAndValues, ITemplateResponseNew} from "../../../../../utils";

const _404 = "No template with ID found";

export async function GET(
    request: Request,
    { params }: { params: { templateId: string } }
) {
    const templateId = params.templateId;
    const template:any = await prisma.template.findFirst({
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

    const templateResponse:ITemplateResponseNew = convert( template );

    return NextResponse.json(templateResponse);
}