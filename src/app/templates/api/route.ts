import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {
    OneTemplateHasManyValues
} from "@prisma/client";
import {EMethod, postData} from "@/app/utils";

export async function getTemplatesApi(): Promise<Array<any>> {
    return fetch("http://localhost:3000/templates/api").then((res) => res.json());
}

export async function GET(request: Request) {
    try {
        const templates = await prisma.template.findMany({
            select: {
                id: true,
                name: true,
                to: true,
                subject: true,
                icon: true,
                templateText: true,
                deletedAt: true,
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

        return NextResponse.json(templates);
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, {status: 500});
    }
}

export const createNewTemplateApi = (name: string, subject: string, to: string, icon: string, templateText: string, valueIdArr: Array<{
    categoryId: string,
    valueId: string
}>) => {
    const data = {
        name: name,
        subject: subject,
        to: to,
        icon: icon,
        templateText: templateText,
        categoryValueIdArr: valueIdArr
    };
    return postData('http://localhost:3000/templates/api', EMethod.POST, data);
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        let template;
        await prisma.$transaction(async (tx) => {
            template = await prisma.template.create({
                data: {
                    name: json.name,
                    subject: json.subject,
                    to: json.to,
                    icon: json.icon,
                    templateText: json.templateText
                },
            });

            for (let i = 0; i < json.categoryValueIdArr.length; i++) {
                const categoryId: string = json.categoryValueIdArr[i].categoryId;
                const valueId: string = json.categoryValueIdArr[i].valueId;
                const templateHasCategoryValue: OneTemplateHasManyValues = await prisma.oneTemplateHasManyValues.create({
                    data: {templateId: template.id, categoryId: categoryId, valueId: valueId}
                })
            }
        });


        return new NextResponse(JSON.stringify(template), {
            status: 201,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, {status: 500});
    }
}

const _404 = "No Template with ID found";

export const deleteTemplateApi = (templateId: string)  => {
    const data = {id: templateId};
    return postData( 'http://localhost:3000/templates/api', EMethod.DELETE, data );
}

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const templateId: string = json.id;

    try {
        const templateHasCategoryValuesArr: Array<OneTemplateHasManyValues> = await prisma.oneTemplateHasManyValues.findMany({
            where: {templateId: templateId}
        });

        const oneTemplateHasManyCategoryValuesIdArr: Array<string> = templateHasCategoryValuesArr.map((m) => m.id);
        await prisma.oneTemplateHasManyValues.deleteMany({
            where: {
                id: {
                    in: oneTemplateHasManyCategoryValuesIdArr
                }
            }
        });

        await prisma.template.update({
            where: { id: templateId },
            data: { deletedAt: new Date() }
        });

        return new NextResponse(null, {status: 204});
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, {status: 404});
        }

        return new NextResponse(error.message, {status: 500});
    }
}