"use client";

import Link from "next/link";
import React, {cache, use} from "react";
import {Category, Template} from "@prisma/client";
import {CategoriesComponent} from "@/app/components/categories/categories.component";
import {Button, CircularProgress, Skeleton} from "@mui/material";
import {NewTemplateComponent} from "@/app/components/templates/newtemplate.component";

const getCategories = cache(async () => {
    const item = fetch(`http://localhost:3000/api/categories`).then((res) => res.json())
    return item
})

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
            categories.length === 0 ? <CircularProgress /> :<CategoriesComponent categories={categories}/>
        }
    </React.Fragment>
}