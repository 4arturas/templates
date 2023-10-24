"use client";

import React, {cache, use} from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {Category, CategoryValue, Template, User} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {
    getOneCategoryHasManyCategoryValues,
    getCategoryValues,
    getTemplate,
    getTemplateCategories,
    ICategoryWithCategoryValue
} from "@/app/utils";
import {TemplateComponent} from "@/app/templates/[id]/template.component";
import {template} from "@babel/core";

export default function TemplatePage({ params }: {params: { id: string }; } ) {

    const [template, setTemplate] = React.useState<Template>();
    const [categoryWithCategoryValue, setCategoryWithCategoryValue] = React.useState<Array<ICategoryWithCategoryValue>>([]);

    React.useEffect(() => {
        (async () => {
            const categoriesArr = await getTemplateCategories(params.id);

            const testArr: Array<ICategoryWithCategoryValue> = [];
            for ( let i = 0; i < categoriesArr.length; i++ )
            {
                const category = categoriesArr[i];
                const categoryDataArr: Array<CategoryValue> = await getCategoryValues(category.id);
                const obj: ICategoryWithCategoryValue = { category: category, data: categoryDataArr };
                testArr.push(obj);
            }
            setCategoryWithCategoryValue( testArr );
            const template:Template = await getTemplate(params.id);
            setTemplate(template);
        })();
    }, []);


    return <>
        {
            !template ? <CircularProgress /> : <TemplateComponent template={template} categoryWithCategoryValue={categoryWithCategoryValue} />
        }
    </>
}