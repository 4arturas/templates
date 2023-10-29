"use client";

import { useRouter } from 'next/navigation'
import {createCategory, EMethod, postData} from "@/app/utils";
import React from "react";
import {CategoryNewComponent} from "@/app/categories/new/categorynew.component";

export default function CategoriesCategoryPage() {
    const router = useRouter();
    const addNewCategory = (name: string, categoryData: Array<string>) => {
        createCategory( name, categoryData ).then((data) => {
            router.push('/categories', { scroll: false })
        });
    }
    return <>
            <CategoryNewComponent addNewCategory={addNewCategory} />
    </>
}