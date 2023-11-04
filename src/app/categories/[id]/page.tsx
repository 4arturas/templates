"use client";

import React, {cache} from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {Category, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {deleteValueApi} from "@/app/values/api/route";
import {getCategoryApi} from "@/app/categories/api/[categoryId]/route";
import {getCategoryValuesApi} from "@/app/categories/api/[categoryId]/values/route";

export default function CategoriesCategory( { params }: {params: { id: string }; } ) {

    const [category, setCategory] = React.useState<Category>();
    const [categoryData, setCategoryValue] = React.useState<Array<Value>>([]);

    const fetchData = async () => {
        setCategory(await getCategoryApi(params.id));
        setCategoryValue(await getCategoryValuesApi(params.id));
    }

    const deleteValueAndFetchData = async (id:string) => {
        setCategory(undefined);
        deleteValueApi(id).then(r=>{
            fetchData();
        })
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
                    deleteValue={deleteValueAndFetchData}/>
        }
    </div>
}