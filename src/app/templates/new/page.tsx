"use client";

import { useRouter } from 'next/navigation'
import React from "react";
import {TemplateComponent} from "@/app/templates/[id]/template.component";
import {CircularProgress} from "@mui/material";
import {
    ICategorySelectItem, ICategorySelect, createNewTemplateApi, getCategoriesApi, getCategoryValuesApi,
} from "../../utils";
import {Template, Value} from "@prisma/client";


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

    }, []);

    return <>
            { !initialized ?
                <CircularProgress />
                :
                <TemplateComponent
                    templateResponse={null}
                    categorySelectArr={categorySelects}
                    categorySelectItemArr={categorySelectOptions}
                    templateFunctionCreateNew={createNewTemplateAndRedirect}
                />
            }
    </>
}