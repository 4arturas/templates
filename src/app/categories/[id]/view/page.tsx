"use client";

import React from "react";
import {Category, Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {getCategoryApi} from "@/app/categories/api/[categoryId]/route";
import {getCategoryValuesApi} from "@/app/categories/api/[categoryId]/values/route";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {updateCategoryApi} from "@/app/categories/api/route";
import {useRouter} from "next/navigation";
import {EMode} from "@/app/utils";
import {CategoryViewComponent} from "@/app/categories/[id]/category.view.component";

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