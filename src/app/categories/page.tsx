"use client";

import React, {cache, use} from "react";
import {Category} from "@prisma/client";
import {CategoriesComponent} from "@/app/categories/categories.component";
import {CircularProgress} from "@mui/material";
import {deleteCategoryApi, getCategoriesApi} from "@/app/categories/api/route";


export default function CategoriesCategoryPage() {
    // const categories = use<Category[]>(getCategories());

    const [categories, setCategories] = React.useState<Array<Category>>();

    const deleteCategoryAndRefresh = async (id: string) => {
        setCategories(undefined);
        deleteCategoryApi(id).then((data) => {
            alert( 1111 );
            fetchData();
        });
    }

    async function fetchData() {
        const categoriesTmp:Array<Category> = await getCategoriesApi();
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