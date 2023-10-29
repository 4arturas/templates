"use client";

import React, {cache} from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {Category, CategoryValue} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {deleteCategoryValueByCategoryId, getCategory, getCategoryValues} from "@/app/utils";

export default function CategoriesCategory( { params }: {params: { id: string }; } ) {

    const [category, setCategory] = React.useState<Category>();
    const [categoryData, setCategoryValue] = React.useState<Array<CategoryValue>>([]);

    const deleteValue = async (id:string) => {
        setCategory(undefined);
        deleteCategoryValueByCategoryId(id).then(r=>{
            fetchData();
        })
    }
    async function fetchData() {
        setCategory(await getCategory(params.id));
        setCategoryValue(await getCategoryValues(params.id));
    }

    React.useEffect( () => {

        fetchData();

    }, []);


    return <div>
        {
            !categoryData ?
                <CircularProgress /> :
                <CategoryComponent
                    category={category}
                    categoryData={categoryData}
                    deleteValue={deleteValue}/>
        }
    </div>
}