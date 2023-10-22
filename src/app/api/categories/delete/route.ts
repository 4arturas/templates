import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category, CategoryData, CategoryHasCategoryData, Prisma, TemplateHasCategory} from "@prisma/client";
import CategoryHasCategoryDataScalarFieldEnum = Prisma.CategoryHasCategoryDataScalarFieldEnum;

const _404 = "No category with ID found";

export async function DELETE(
    request: Request
) {
    const json = await request.json();
        const categoryId:string = json.id;

    try {
        const categoryHasCategoryDataArr: Array<CategoryHasCategoryData> = await prisma.categoryHasCategoryData.findMany( {
            where: {
                categoryId: categoryId
            }
        });
        const categoryHasCategoryDataIdArr: Array<string> = categoryHasCategoryDataArr.map( (c:CategoryHasCategoryData) => c.id);
        categoryHasCategoryDataIdArr.map( async (id: string) => {
            await prisma.categoryHasCategoryData.delete({
                where: { id: id }
            });
        });
        const categoryDataIdArr: Array<string> = categoryHasCategoryDataArr.map( (c:CategoryHasCategoryData) => c.categoryDataId);
        categoryDataIdArr.map( async (categoryDataId: string) => {
           await prisma.categoryData.delete({
               where: { id: categoryDataId }
           });
        });

        const templateHasCategoryArr:Array<TemplateHasCategory> = await prisma.templateHasCategory.findMany({
            where: { categoryId: categoryId }
        });

        const templateHasCategoryIdArr:Array<string> = templateHasCategoryArr.map( (t:TemplateHasCategory) => t.id );
        templateHasCategoryIdArr.map( async (id:string) => {
            await prisma.templateHasCategory.delete({ where: {id: id } });
        })

        await prisma.category.delete({
            where: { id: categoryId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse(_404, { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}