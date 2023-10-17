"use client";

import Link from "next/link";
import React, {cache, use} from "react";
import {Category, Template} from "@prisma/client";
import {CategoriesComponent} from "@/app/components/categories/categories.component";
import {Button, CircularProgress} from "@mui/material";
import {NewtTemplateComponent} from "@/app/components/templates/newtemplate.component";

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

    return <div>
        <h3>Categories</h3>
        { categories.length === 0 ?
            <CircularProgress />
            :
            <>
                <Link href="/categories/new" passHref>
                    <Button>Create New Category</Button>
                </Link>
                <CategoriesComponent categories={categories}/>
            </>

        }
    </div>
}