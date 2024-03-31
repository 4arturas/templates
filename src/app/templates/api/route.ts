import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {
    OneTemplateHasManyValues, Prisma, Template
} from "@prisma/client";
import {
    convert,
    EMethod,
    ICategoryWithValues,
    IDBTemplateWithCategoriesAndValues,
    ITemplateResponseNew,
    postData
} from "../../utils";


export async function GET(request: Request) {
    try {
        const templates:Array<any>/*Array<ITemplateResponse>*/ = await prisma.template.findMany({
            where: {
                deletedAt: null
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
                                name: true,
                            }
                        }
                    }
                }
            }
        });

        const templatesResponse:Array<ITemplateResponseNew> = [];
        for ( let i = 0; i < templates.length; i++ )
        {
            const template:IDBTemplateWithCategoriesAndValues = templates[i];
            const templateResponse = convert( template );
            templatesResponse.push(templateResponse);
        } // end for i

        return NextResponse.json(templatesResponse);
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, {status: 500});
    }
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

enum EAction {
    UPDATE = 1, DELETE = 2
}
async function backupTemplate( templateId:string, action:EAction ) {
    const templateHistory:any = await prisma.template.findFirst({
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
    const backupTemplateObject:ITemplateResponseNew = convert( templateHistory );
    const resHistory = await prisma.history.create({
        data: {
            actionId: action,
            json: JSON.stringify(backupTemplateObject)
        }
    })
    console.log( resHistory );
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

            await backupTemplate( template.id, 1 );

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

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const templateId: string = json.id;

    try {

        await backupTemplate( templateId, EAction.DELETE );

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