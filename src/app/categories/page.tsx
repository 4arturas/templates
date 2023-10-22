"use client";

import React, {cache, use} from "react";
import {Category} from "@prisma/client";
import {CategoriesComponent} from "@/app/categories/categories.component";
import { CircularProgress} from "@mui/material";
import {getCategories} from "@/app/utils";



export default function CategoriesCategoryPage() {
    // const categories = use<Category[]>(getCategories());

    const [categories, setCategories] = React.useState<Array<Category>>([]);

    React.useEffect( () => {
        async function startFetching() {
            setCategories(await getCategories());
        }
        startFetching();
        return () => { };
    }, []);

    return <React.Fragment>
        {
            !categories ? <CircularProgress /> :<CategoriesComponent categories={categories}/>
        }
    </React.Fragment>
}