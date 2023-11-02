"use client";

import { useRouter } from 'next/navigation'
import React from "react";
import {CategoryNewComponent} from "@/app/categories/new/categorynew.component";
import {createCategoryApi} from "@/app/categories/api/route";

export default function CategoriesCategoryPage() {
    const router = useRouter();
    const addNewCategory = (name: string, categoryData: Array<string>) => {
        createCategoryApi( name, categoryData ).then((data) => {
            router.push('/categories', { scroll: false })
        });
    }
    return <>
            <CategoryNewComponent addNewCategory={addNewCategory} />
    </>
}