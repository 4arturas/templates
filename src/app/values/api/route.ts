import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const _404 = "No category with ID found";

export const deleteValueApi = (async (id: string) => {
    const data = {id: id};
    const response = await fetch('http://localhost:3000/values/api', {
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