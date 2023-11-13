"use client";

import { useRouter } from 'next/navigation'
import React, {cache} from "react";
import {TemplateComponent} from "@/app/templates/[id]/template.component";
import {CircularProgress} from "@mui/material";
import {
    ICategorySelectItem, ICategorySelect,
} from "../../utils";
import {Template, Value} from "@prisma/client";
import {getCategoriesApi} from "@/app/categories/api/route";
import {createNewTemplateApi} from "@/app/templates/api/route";
import {getCategoryValuesApi} from "@/app/categories/api/[categoryId]/values/route";


export default function TemplatesNewPage() {
    const router = useRouter();

    const [categorySelects, setCategorySelects] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectOptions, setCategorySelectOptions] = React.useState<Array<ICategorySelectItem>>([]);
    const [initialized, setInitialized] = React.useState<boolean>(false);

    const createNewTemplateAndRedirect = (template: Template, values:Array<{ categoryId:string, valueId:string }>) => {
        createNewTemplateApi(template, values).then((data) => {
            router.push('/templates', { scroll: false })
        });
    }

    React.useEffect( () => {
        async function startFetching() {
            const categoriesArrTmp = await getCategoriesApi();
            const categoriesArr = categoriesArrTmp.filter( f => f.deletedAt === null );
            const _categoryOptions:Array<ICategorySelect> = [];
            const _options:Array<ICategorySelectItem> = [];
            for ( let i = 0; i < categoriesArr.length; i++ )
            {
                const category = categoriesArr[i];
                const categoryDataArr: Array<Value> = await getCategoryValuesApi(category.id);
                _categoryOptions.push({name:category.name, categoryId:category.id, selectedValue: [], selectedCategoryValueId: []});

                categoryDataArr.map( d => {
                    _options.push({name:d.name, categoryValueId:d.id, categoryId:category.id})
                });
            }

            setCategorySelects(_categoryOptions);
            setCategorySelectOptions(_options);
            setInitialized(true)
        }
        startFetching();
        // return () => { };
    }, []);

    return <>
            { !initialized ?
                <CircularProgress />
                :
                <TemplateComponent
                    templateResponse={undefined}
                    categorySelectArr={categorySelects}
                    categorySelectItemArr={categorySelectOptions}
                    templateFunctionCreateNew={createNewTemplateAndRedirect}
                />
            }
    </>
}