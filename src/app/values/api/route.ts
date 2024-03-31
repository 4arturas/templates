import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {EMethod, postData} from "../../utils";

const _404 = "No category with ID found";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {

        let json = await request.json();
        const valueId = json.id;

        const r1 = await prisma.oneCategoryHasManyValues.deleteMany({
            where: {
                valueId: valueId
            }
        })

        const r2 = await prisma.oneTemplateHasManyValues.deleteMany({
            where: {
                valueId: valueId
            }
        })
        
        const r3 = await prisma.value.update({
            where: { id: valueId },
            data: {
                deletedAt: new Date()
            }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PATCH(
    request: Request
) {
    try {

        let json = await request.json();
        const valueId = json.id;
        const name = json.name;

        const oldValue = await prisma.value.findFirst({
            where: {
                id: valueId
            }
        })

        if ( oldValue )
        {
            const historyValue = await prisma.valueHistory.create({
                data: {
                    valueId: oldValue.id,
                    name: oldValue.name,
                    updatedAt: oldValue.updatedAt
                }
            })
        }

        const updatedValue = await prisma.value.update({
            where: {
                id: valueId
            },
            data: {
                name: name
            },
        })

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}