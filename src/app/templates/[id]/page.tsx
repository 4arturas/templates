"use client";

import React, {cache, use} from "react";
import {Category, Template, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {
    ICategorySelectItem, ICategorySelect, ITemplateResponseNew
} from "../../utils";

import {TemplateComponent} from "@/app/templates/[id]/template.component";
import {getCategoriesApi} from "@/app/categories/api/route";
import {getCategoryValuesApi} from "@/app/categories/api/[categoryId]/values/route";
import {getTemplateWithCategoryValues} from "@/app/templates/api/template/[templateId]/withcategoryvalues/route";
import {createNewTemplateApi} from "@/app/templates/api/route";
import {useRouter} from "next/navigation";

export default function TemplatePage({ params }: {params: { id: string }; } ) {
    const router = useRouter();

    const [templateResponse, setTemplateResponse] = React.useState<ITemplateResponseNew>();
    const [categorySelects, setCategorySelects] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectOptions, setCategorySelectOptions] = React.useState<Array<ICategorySelectItem>>([]);

    const editTemplateAndRedirect = (template: Template, values:Array<{ categoryId:string, valueId:string }>) => {
        createNewTemplateApi(template, values).then((data) => {
            router.push('/templates', { scroll: false })
        });
    }

    React.useEffect( () => {

        async function startFetching() {

            const templateResponseNew:ITemplateResponseNew = await getTemplateWithCategoryValues(params.id);

            const categories:Category[] = await getCategoriesApi();

            const _categoryOptionsNew:Array<ICategorySelect> = [];
            const _optionsNew:Array<ICategorySelectItem> = [];
            for ( let i = 0; i < categories.length; i++ )
            {
                const category = categories[i];
                const values: Array<Value> = await getCategoryValuesApi(category.id);

                const templateHasValuesNew: Array<{ id: string, name: string }> = templateResponseNew.categories.filter( f => f.id === category.id ).flatMap( m => m.values );
                const selectedValueNew: Array<string> = templateHasValuesNew
                    .map( m => m.name );
                const selectedValueIdNew: Array<string> = templateHasValuesNew
                    .map( m => m.id );
                const categorySelectNew : ICategorySelect = {name:category.name, categoryId:category.id, selectedValue: selectedValueNew, selectedCategoryValueId: selectedValueIdNew };
                _categoryOptionsNew.push(categorySelectNew);

                values.map( (d:Value) => {
                    _optionsNew.push({name:d.name, categoryValueId:d.id, categoryId:category.id})
                });
            }

            setCategorySelects(_categoryOptionsNew);
            setCategorySelectOptions(_optionsNew);
            setTemplateResponse(templateResponseNew);
        }
        startFetching();
        // return () => { };
    }, []);


    return <>
        {
            !templateResponse ?
                <CircularProgress /> :
                <TemplateComponent
                    templateResponse={templateResponse}
                    categorySelectArr={categorySelects}
                    categorySelectItemArr={categorySelectOptions}
                    templateFunctionCreateNew={()=>editTemplateAndRedirect}/>
        }
    </>
}