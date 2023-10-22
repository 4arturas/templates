"use client";

import React, {cache, use} from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {Category, CategoryData, Template, User} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {
    getCategoryHasCategoryData,
    getCategoryValues,
    getTemplate,
    getTemplateCategories,
    ICategoryWithCategoryData
} from "@/app/utils";
import {TemplateComponent} from "@/app/templates/[id]/template.component";

export default function TemplatePage({ params }: {params: { id: string }; } ) {

    const [template, setTemplate] = React.useState<Template>();
    const [categoryWithCategoryData, setCategoryWithCategoryData] = React.useState<Array<ICategoryWithCategoryData>>([]);

    React.useEffect(() => {
        (async () => {
            const categoriesArr = await getTemplateCategories(params.id);

            const testArr: Array<ICategoryWithCategoryData> = [];
            for ( let i = 0; i < categoriesArr.length; i++ )
            {
                const category = categoriesArr[i];
                const categoryDataArr: Array<CategoryData> = await getCategoryValues(category.id);
                const obj: ICategoryWithCategoryData = { category: category, data: categoryDataArr };
                testArr.push(obj);
            }
            setCategoryWithCategoryData( testArr );
            setTemplate(await getTemplate(params.id));
        })();
    }, []);


    return <>
        {
            !template ? <CircularProgress /> : <TemplateComponent template={template} categoryWithCategoryData={categoryWithCategoryData} />
        }
    </>
}