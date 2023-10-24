import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category, CategoryValue, OneCategoryHasManyCategoryValues, Prisma, OneTemplateHasManyCategories} from "@prisma/client";
import OneCategoryHasManyCategoryValuesScalarFieldEnum = Prisma.OneCategoryHasManyCategoryValuesScalarFieldEnum;

const _404 = "No category with ID found";

export async function DELETE(
    request: Request
) {
    const json = await request.json();
        const categoryId:string = json.id;

    try {
        const categoryHasCategoryValueArr: Array<OneCategoryHasManyCategoryValues> = await prisma.oneCategoryHasManyCategoryValues.findMany( {
            where: {
                categoryId: categoryId
            }
        });
        const categoryHasCategoryValueIdArr: Array<string> = categoryHasCategoryValueArr.map( (c:OneCategoryHasManyCategoryValues) => c.id);
        categoryHasCategoryValueIdArr.map( async (id: string) => {
            await prisma.oneCategoryHasManyCategoryValues.delete({
                where: { id: id }
            });
        });
        const categoryDataIdArr: Array<string> = categoryHasCategoryValueArr.map( (c:OneCategoryHasManyCategoryValues) => c.categoryDataId);
        categoryDataIdArr.map( async (categoryDataId: string) => {
           await prisma.categoryValue.delete({
               where: { id: categoryDataId }
           });
        });

        const templateHasCategoryArr:Array<OneTemplateHasManyCategories> = await prisma.oneTemplateHasManyCategories.findMany({
            where: { categoryId: categoryId }
        });

        const templateHasCategoryIdArr:Array<string> = templateHasCategoryArr.map( (t:OneTemplateHasManyCategories) => t.id );
        templateHasCategoryIdArr.map( async (id:string) => {
            await prisma.oneTemplateHasManyCategories.delete({ where: {id: id } });
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