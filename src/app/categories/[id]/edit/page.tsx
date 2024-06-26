"use client";

import React from "react";
import {Category, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {useRouter} from "next/navigation";
import {EMode, getCategoryApi, getCategoryValuesApi, updateCategoryApi} from "../../../utils";

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

    React.useEffect( () => {

        fetchData();

    }, []);


    return <div>
        {
            !category ?
                <CircularProgress /> :
                <CategoryComponent
                    mode={EMode.EDIT}
                    category={category}
                    valuesArr={values}
                    categoryFunction={updateCategoryAndRedirect}
                />
        }
    </div>
}