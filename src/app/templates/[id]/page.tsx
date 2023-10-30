"use client";

import React, {cache, use} from "react";
import {Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {
        ICategoryMenuItem, ICategorySelect, ITemplateResponse
} from "@/app/utils";

import {NewTemplateComponent} from "@/app/templates/new/newtemplate.component";
import {getTemplateWithCategoryValues} from "@/app/templates/api/template/[id]/withcategoryvalues/route";
import {getCategoryValuesApi} from "@/app/categories/api/[id]/values/route";
import {getCategoriesApi} from "@/app/categories/api/route";

export default function TemplatePage({ params }: {params: { id: string }; } ) {

    const [templateResponse, setTemplateResponse] = React.useState<ITemplateResponse>();
    const [categorySelects, setCategorySelects] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectOptions, setCategorySelectOptions] = React.useState<Array<ICategoryMenuItem>>([]);
    const [initialized, setInitialized] = React.useState<boolean>(false);

    React.useEffect( () => {
        async function startFetching() {

            const templateResponseTmp = await getTemplateWithCategoryValues(params.id);
            setTemplateResponse(templateResponseTmp);

            const categoriesArr = await getCategoriesApi();
            const _categoryOptions:Array<ICategorySelect> = [];
            const _options:Array<ICategoryMenuItem> = [];
            for ( let i = 0; i < categoriesArr.length; i++ )
            {
                const category = categoriesArr[i];
                const categoryDataArr: Array<Value> = await getCategoryValuesApi(category.id);

                const tmp: Array<{ id: string, name: string }> = templateResponseTmp.OneTemplateHasManyValues.filter(f => f.category.id === category.id ).map(m => m.values );
                const selectedValue: Array<string> = tmp.map( m => m.name );
                const selectedCategoryValueId: Array<string> = tmp.map( m => m.id );

                const item : ICategorySelect = {name:category.name, categoryId:category.id, selectedValue: selectedValue, selectedCategoryValueId: selectedCategoryValueId };
                _categoryOptions.push(item);

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
        {
            !initialized ?
                <CircularProgress /> :
                <NewTemplateComponent
                    templateResponse={templateResponse}
                    categoryOptions={categorySelects}
                    options={categorySelectOptions}
                    templateFunction={()=>{
                        alert( 'Not implemented' );
                    }}/>
        }
    </>
}