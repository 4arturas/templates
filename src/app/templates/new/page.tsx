"use client";

import { useRouter } from 'next/navigation'
import React, {cache} from "react";
import {NewTemplateComponent} from "@/app/templates/new/newtemplate.component";
import {CircularProgress} from "@mui/material";
import {
    createNewTemplate,
    getCategories,
    ICategoryMenuItem, ICategorySelect,
} from "@/app/utils";
import {Value} from "@prisma/client";
import {getCategoryValuesApi} from "@/app/categories/api/[id]/values/route";


export default function TemplatesNewPage() {
    const router = useRouter();

    const [categorySelects, setCategorySelects] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectOptions, setCategorySelectOptions] = React.useState<Array<ICategoryMenuItem>>([]);
    const [initialized, setInitialized] = React.useState<boolean>(false);

    const createNewTemplateAndRedirect = (name:string, subject: string, to: string, icon: string, templateText: string, categoryValueArr:Array<{ categoryId:string, categoryValueId:string }>) => {
        createNewTemplate(name, subject, to, icon, templateText, categoryValueArr).then((data) => {
            router.push('/templates', { scroll: false })
        });
    }

    React.useEffect( () => {
        async function startFetching() {
            const categoriesArr = await getCategories();

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
                <NewTemplateComponent
                    templateResponse={undefined}
                    categoryOptions={categorySelects}
                    options={categorySelectOptions}
                    templateFunction={createNewTemplateAndRedirect}
                />
            }
    </>
}