import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {
    OneTemplateHasManyValues, Prisma, Template
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

export const createNewTemplateApi = (template: Template, values: Array<{
    categoryId: string,
    valueId: string
}>) => {
    const data = {
        template: template,
        values: values
    };
    return postData('http://localhost:3000/templates/api', EMethod.POST, data);
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        let newTemplate;
        await prisma.$transaction(async (tx) => {
            const template = json.template;
            newTemplate = await prisma.template.create({
                data: { ...template, id: undefined, createdAt: undefined, updatedAt: undefined, deletedAt: undefined }
            });

            for (let i = 0; i < json.values.length; i++) {
                const categoryId: string = json.values[i].categoryId;
                const valueId: string = json.values[i].valueId;
                const templateHasCategoryValue: OneTemplateHasManyValues = await prisma.oneTemplateHasManyValues.create({
                    data: {templateId: newTemplate.id, categoryId: categoryId, valueId: valueId}
                })
            } // end for
        });


        return new NextResponse(JSON.stringify(newTemplate), {
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

export const editTemplateApi = (template: Template, values: Array<{
    categoryId: string,
    valueId: string
}>) => {
    const data = {
        template: template,
        values: values
    };
    return postData('http://localhost:3000/templates/api', EMethod.PATCH, data);
}

export async function PATCH(request: Request) {
    try {
        const json = await request.json();

        let updateTemplate;
        const template = json.template;

        const existingRelationships:Array<OneTemplateHasManyValues> = await prisma.oneTemplateHasManyValues.findMany({
            where: {
                templateId: template.id
            }
        });
        const existingRelationshipsValues:Array<string> = existingRelationships.map( f => f.valueId );

        await prisma.$transaction(async (tx) => {

            const valuesFromUI: Array<{categoryId:string, valueId:string}> = json.values;
            const valuesIdFromUI: Array<string> = valuesFromUI.map( m => m.valueId );

            const valuesToDelete:Array<string> = existingRelationshipsValues.filter( (existing) => !valuesIdFromUI.includes( existing ) );
            if ( valuesToDelete.length > 0 )
            {
                const valuesToDeleteRes = await tx.oneTemplateHasManyValues.deleteMany({
                    where: {
                        templateId: template.id,
                        valueId: { in: valuesToDelete }
                    }
                });
            }
            console.log( 'valuesToDelete', valuesToDelete );

            const valuesToAdd:Array<{categoryId:string, valueId:string}> = valuesFromUI.filter( (v:{categoryId:string, valueId:string}) => !valuesToDelete.includes(v.valueId) && !existingRelationshipsValues.includes(v.valueId));
            for ( let i = 0; i < valuesToAdd.length; i++ ) {
                const valueToAdd = valuesToAdd[i];
                const valuesToAddRes = await tx.oneTemplateHasManyValues.create( {
                    data: {
                        templateId: template.id,
                        categoryId: valueToAdd.categoryId,
                        valueId: valueToAdd.valueId
                    }
                })
            }
            console.log( 'valuesToAdd', valuesToAdd );


            updateTemplate = await tx.template.update({
                where: {
                    id: template.id
                },
                data: {
                    name: template.name,
                    subject: template.subject,
                    to: template.to,
                    icon: template.icon,
                    templateText: template.templateText
                }
            });
        },   {
            maxWait: 20000, // default: 2000
            timeout: 50000, // default: 5000
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
        });


        return new NextResponse(JSON.stringify(updateTemplate), {
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