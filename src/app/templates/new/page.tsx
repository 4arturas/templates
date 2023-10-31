"use client";

import { useRouter } from 'next/navigation'
import React, {cache} from "react";
import {TemplateComponent} from "@/app/templates/new/template.component";
import {CircularProgress} from "@mui/material";
import {
    ICategoryMenuItem, ICategorySelect,
} from "@/app/utils";
import {Value} from "@prisma/client";
import {getCategoryValuesApi} from "@/app/categories/api/[id]/values/route";
import {getCategoriesApi} from "@/app/categories/api/route";
import {createNewTemplateApi} from "@/app/templates/api/route";


export default function TemplatesNewPage() {
    const router = useRouter();

    const [categorySelects, setCategorySelects] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectOptions, setCategorySelectOptions] = React.useState<Array<ICategoryMenuItem>>([]);
    const [initialized, setInitialized] = React.useState<boolean>(false);

    const createNewTemplateAndRedirect = (name:string, subject: string, to: string, icon: string, templateText: string, categoryValueArr:Array<{ categoryId:string, categoryValueId:string }>) => {
        createNewTemplateApi(name, subject, to, icon, templateText, categoryValueArr).then((data) => {
            router.push('/templates', { scroll: false })
        });
    }

    React.useEffect( () => {
        async function startFetching() {
            const categoriesArr = await getCategoriesApi();

            const _categoryOptions:Array<ICategorySelect> = [];
            const _options:Array<ICategoryMenuItem> = [];
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
                    categoryOptions={categorySelects}
                    options={categorySelectOptions}
                    templateFunction={createNewTemplateAndRedirect}
                />
            }
    </>
}