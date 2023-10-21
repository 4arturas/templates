"use client";

import React, {cache} from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {Category, CategoryData} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {getCategory, getCategoryValues} from "@/app/utils";

export default function CategoriesCategory( { params }: {params: { id: string }; } ) {

    const [category, setCategory] = React.useState<Category>();
    const [categoryData, setCategoryData] = React.useState<Array<CategoryData>>([]);

    React.useEffect( () => {
        async function startFetching() {
            setCategory(await getCategory(params.id));
            setCategoryData(await getCategoryValues(params.id));
        }
        startFetching();

    }, []);


    return <div>
        {
            !categoryData ? <CircularProgress /> : <CategoryComponent category={category} categoryData={categoryData}/>
        }
    </div>
}