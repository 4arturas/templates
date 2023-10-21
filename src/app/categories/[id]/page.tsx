"use client";

import React, {cache} from "react";
import {CategoryComponent} from "@/app/components/categories/category/category.component";
import {Category, CategoryData} from "@prisma/client";
import {CircularProgress} from "@mui/material";

const getCategory = (async (id: string): Promise<Category> => {
    const item = fetch(`http://localhost:3000/api/categories/${id}`).then((res) => res.json())
    return item
})

const getCategoryValues = (async (id: string) : Promise<Array<CategoryData>> => {
    return  fetch(`http://localhost:3000/api/categoryvalues/${id}`).then((res) => res.json())
})
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