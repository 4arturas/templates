import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Category, CategoryValue, OneCategoryHasManyCategoryValues, Prisma} from "@prisma/client";
import OneCategoryHasManyCategoryValuesScalarFieldEnum = Prisma.OneCategoryHasManyCategoryValuesScalarFieldEnum;

const _404 = "No category with ID found";

export async function DELETE(
    request: Request
) {
    const json = await request.json();
    const categoryDataId:string = json.id;

    try {
        const categoryHasCategoryValueArr: Array<OneCategoryHasManyCategoryValues> = await prisma.oneCategoryHasManyCategoryValues.findMany( {
            where: {
                categoryDataId: categoryDataId
            }
        });
        const categoryHasCategoryValueIdArr: Array<string> = categoryHasCategoryValueArr.map( (c:OneCategoryHasManyCategoryValues) => c.id);
        categoryHasCategoryValueIdArr.map( async (id: string) => {
            await prisma.oneCategoryHasManyCategoryValues.delete({
                where: { id: id }
            });
        });

        await prisma.categoryValue.delete({
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