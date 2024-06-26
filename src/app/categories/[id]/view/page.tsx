"use client";

import React from "react";
import {Category, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {CategoryViewComponent} from "@/app/categories/[id]/category.view.component";
import {getCategoryApi, getCategoryValuesApi} from "@/app/utils";

export default function CategoryViewPage( { params }: {params: { id: string }; } ) {

    const [category, setCategory] = React.useState<Category>();
    const [values, setValues] = React.useState<Array<Value>>([]);

    const fetchData = async () => {
        setValues(await getCategoryValuesApi(params.id));
        setCategory(await getCategoryApi(params.id));
    }

    React.useEffect( () => {

        fetchData();

    }, []);


    return <div>
        {
            !category ?
                <CircularProgress /> :
                <CategoryViewComponent category={category} values={values} />
        }
    </div>
}