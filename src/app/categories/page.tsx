"use client";

import Link from "next/link";
import {cache, use} from "react";
import {Category, Template} from "@prisma/client";
import {CategoriesComponent} from "@/app/components/categories/categories.component";
import {Button} from "@mui/material";

const getCategories = cache(async () => {
    const item = fetch(`http://localhost:3000/api/categories`).then((res) => res.json())
    return item
})

export default function CategoriesCategoryPage() {
    let categories = use<Category[]>(getCategories());

    return <div>
        <h3>Categories</h3>
        <Link href="/categories/new" passHref>
            <Button>Create New Category</Button>
        </Link>
        <CategoriesComponent categories={categories}/>
    </div>
}