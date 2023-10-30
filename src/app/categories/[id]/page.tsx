"use client";

import React, {cache} from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {Category, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {deleteValueApi} from "@/app/values/api/route";
import {getCategoryValuesApi} from "@/app/categories/api/[id]/values/route";
import {getCategoryApi} from "@/app/categories/api/[id]/route";

export default function CategoriesCategory( { params }: {params: { id: string }; } ) {

    const [category, setCategory] = React.useState<Category>();
    const [categoryData, setCategoryValue] = React.useState<Array<Value>>([]);

    const deleteValueAndFetchData = async (id:string) => {
        setCategory(undefined);
        deleteValueApi(id).then(r=>{
            fetchData();
        })
    }
    async function fetchData() {
        setCategory(await getCategoryApi(params.id));
        setCategoryValue(await getCategoryValuesApi(params.id));
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