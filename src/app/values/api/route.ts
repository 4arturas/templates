import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {EMethod, postData} from "@/app/utils";

const _404 = "No category with ID found";

export const deleteValueApi = (id: string)  => {
    const data = {id: id};
    return postData( 'http://localhost:3000/values/api', EMethod.DELETE, data );
}
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

        const r3 = await prisma.value.delete({
            where: { id: valueId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}