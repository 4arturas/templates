"use client";

import { useRouter } from 'next/navigation'
import {postData} from "@/app/utils";
import React from "react";
import {CategoryNewComponent} from "@/app/categories/new/categorynew.component";

export default function CategoriesCategoryPage() {
    const router = useRouter();
    const addNewCategory = (name: string, categoryData: Array<string>) => {
        const data = { name: name, categoryData: categoryData };
        postData('http://localhost:3000/api/categories', data ).then((data) => {
            router.push('/categories', { scroll: false })
        });

    }
    return <>
            <CategoryNewComponent addNewCategory={addNewCategory} />
    </>
}