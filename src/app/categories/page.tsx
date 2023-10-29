"use client";

import React, {cache, use} from "react";
import {Category} from "@prisma/client";
import {CategoriesComponent} from "@/app/categories/categories.component";
import {CircularProgress} from "@mui/material";
import {getCategories} from "@/app/utils";
import {deleteCategory} from "@/app/categories/api/route";


export default function CategoriesCategoryPage() {
    // const categories = use<Category[]>(getCategories());

    const [categories, setCategories] = React.useState<Array<Category>>();

    const deleteCategoryAndRefresh = async (id: string) => {
        setCategories(undefined);
        deleteCategory(id).then(r => {
            fetchData();
        })
    }

    async function fetchData() {
        const categoriesTmp:Array<Category> = await getCategories();
        setCategories(categoriesTmp);
    }

    React.useEffect(() => {
        fetchData();
        // return () => { };
    }, []);

    return <React.Fragment>
        {
            !categories ?
                <CircularProgress/> :
                <CategoriesComponent
                    categories={categories}
                    deleteCategory={deleteCategoryAndRefresh}
                />
        }
    </React.Fragment>
}