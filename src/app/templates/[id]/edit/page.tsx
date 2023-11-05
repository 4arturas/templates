"use client";

import React, {cache, use} from "react";
import {Template, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {
    ICategorySelectItem, ICategorySelect, ITemplateResponse
} from "@/app/utils";

import {TemplateComponent} from "@/app/templates/[id]/template.component";
import {getCategoriesApi} from "@/app/categories/api/route";
import {getCategoryValuesApi} from "@/app/categories/api/[categoryId]/values/route";
import {getTemplateWithCategoryValues} from "@/app/templates/api/template/[templateId]/withcategoryvalues/route";
import {createNewTemplateApi, editTemplateApi} from "@/app/templates/api/route";
import {useRouter} from "next/navigation";

export default function TemplateEditPage({ params }: {params: { id: string }; } ) {
    const router = useRouter();

    const [templateResponse, setTemplateResponse] = React.useState<ITemplateResponse>();
    const [categorySelects, setCategorySelects] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectOptions, setCategorySelectOptions] = React.useState<Array<ICategorySelectItem>>([]);

    const createNewTemplateAndRedirect = (template: Template, values:Array<{ categoryId:string, valueId:string }>) => {
        editTemplateApi(template, values).then((data) => {
            router.push('/templates', { scroll: false })
        });
    }

    React.useEffect( () => {

        async function startFetching() {

            const templateResponseTmp = await getTemplateWithCategoryValues(params.id);

            const categories = await getCategoriesApi();
            const _categoryOptions:Array<ICategorySelect> = [];
            const _options:Array<ICategorySelectItem> = [];
            for ( let i = 0; i < categories.length; i++ )
            {
                const category = categories[i];
                const values: Array<Value> = await getCategoryValuesApi(category.id);

                const templateHasValues: Array<{ id: string, name: string }> = templateResponseTmp.OneTemplateHasManyValues
                    .filter(f => f.category.id === category.id ).map(m => m.values );
                const selectedValue: Array<string> = templateHasValues
                    .map( m => m.name );
                const selectedValueId: Array<string> = templateHasValues
                    .map( m => m.id );

                const categorySelect : ICategorySelect = {name:category.name, categoryId:category.id, selectedValue: selectedValue, selectedCategoryValueId: selectedValueId };
                _categoryOptions.push(categorySelect);

                values.map( d => {
                    _options.push({name:d.name, categoryValueId:d.id, categoryId:category.id})
                });
            }

            setCategorySelects(_categoryOptions);
            setCategorySelectOptions(_options);
            setTemplateResponse(templateResponseTmp);
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
                    templateFunctionCreateNew={createNewTemplateAndRedirect}/>
        }
    </>
}