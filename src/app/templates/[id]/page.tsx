"use client";

import React, {cache, use} from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {Category, CategoryData, Template, User} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {getCategoryValues, getTemplate, getTemplateCategories} from "@/app/utils";
import {TemplateComponent} from "@/app/templates/[id]/template.component";

export default function TemplatePage({ params }: {params: { id: string }; } ) {

    const [template, setTemplate] = React.useState<Template>();
    const [categories, setCategories] = React.useState<Array<Category>>([]);

    React.useEffect( () => {
        async function startFetching() {
            setTemplate(await getTemplate(params.id));

            const categoriesArr = await getTemplateCategories(params.id);
            setCategories(categoriesArr);

            categoriesArr.map( async (category) =>  {
                const categoryValuesArr = await getCategoryValues(category.id)
            })
        }
        startFetching();

    }, []);


    return <>
        {
            !template ? <CircularProgress /> : <TemplateComponent template={template} categories={categories} />
        }
    </>
}