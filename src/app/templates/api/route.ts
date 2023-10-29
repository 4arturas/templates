import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {
    OneTemplateHasManyValues
} from "@prisma/client";

export async function GET(request: Request) {

    try {
        const templates = await prisma.template.findMany({
            select: {
                id: true,
                name: true,
                to: true,
                subject: true,
                icon: true,
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

export async function POST(request: Request) {
    try {
        const json = await request.json();

        const template = await prisma.template.create({
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
            const categoryValueId: string = json.categoryValueIdArr[i].categoryValueId;
            const templateHasCategoryValue: OneTemplateHasManyValues = await prisma.oneTemplateHasManyValues.create({
                data: {templateId: template.id, categoryId: categoryId, valueId: categoryValueId}
            })
            console.log(templateHasCategoryValue);
        }

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


export const deleteTemplate = (async (id: string) => {
    const data = {id: id};
    return fetch('http://localhost:3000/templates/api', {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
})
export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const templateId:string = json.id;

    try {
        const templateHasCategoryValuesArr:Array<OneTemplateHasManyValues> = await prisma.oneTemplateHasManyValues.findMany({
            where: { templateId: templateId }
        });

        const oneTemplateHasManyCategoryValuesIdArr: Array<string> = templateHasCategoryValuesArr.map( (m) => m.id );
        await prisma.oneTemplateHasManyValues.deleteMany({
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