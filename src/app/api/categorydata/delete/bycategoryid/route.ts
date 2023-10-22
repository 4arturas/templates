import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category, CategoryData, CategoryHasCategoryData, Prisma} from "@prisma/client";
import CategoryHasCategoryDataScalarFieldEnum = Prisma.CategoryHasCategoryDataScalarFieldEnum;

const _404 = "No category with ID found";

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const categoryDataId:string = json.id;

    try {
        const categoryHasCategoryDataArr: Array<CategoryHasCategoryData> = await prisma.categoryHasCategoryData.findMany( {
            where: {
                categoryDataId: categoryDataId
            }
        });
        const categoryHasCategoryDataIdArr: Array<string> = categoryHasCategoryDataArr.map( (c:CategoryHasCategoryData) => c.id);
        categoryHasCategoryDataIdArr.map( async (id: string) => {
            await prisma.categoryHasCategoryData.delete({
                where: { id: id }
            });
        });

        await prisma.categoryData.delete({
            where: { id: categoryDataId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}