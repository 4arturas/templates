"use client";

import React, {cache} from "react";
import {Category, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {deleteValueApi} from "@/app/values/api/route";
import {getCategoryApi} from "@/app/categories/api/[categoryId]/route";
import {getCategoryValuesApi} from "@/app/categories/api/[categoryId]/values/route";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {updateCategoryApi} from "@/app/categories/api/route";
import {useRouter} from "next/navigation";

export default function CategoriesCategory( { params }: {params: { id: string }; } ) {
    const router = useRouter();

    const [category, setCategory] = React.useState<Category>();
    const [values, setValues] = React.useState<Array<Value>>([]);

    const fetchData = async () => {
        setValues(await getCategoryValuesApi(params.id));
        setCategory(await getCategoryApi(params.id));
    }

    const updateCategoryAndRedirect = (category: Category, values: Array<Value>) => {
        updateCategoryApi( category, values ).then((data) => {
            router.push('/categories', { scroll: false })
        });
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
            !category ?
                <CircularProgress /> :
                <CategoryComponent category={category} valuesArr={values} categoryFunction={updateCategoryAndRedirect}/>
        }
    </div>
}