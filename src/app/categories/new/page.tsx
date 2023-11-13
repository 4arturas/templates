"use client";

import {useRouter} from 'next/navigation'
import React from "react";
import {CategoryComponent} from "@/app/categories/[id]/category.component";
import {createCategoryApi} from "@/app/categories/api/route";
import {Category, Value} from "@prisma/client";
import {EMode} from "../../utils";

export default function CategoriesCategoryPage() {
    const router = useRouter();
    const addNewCategory = (category: Category, values: Array<Value>) => {
        createCategoryApi( category, values ).then((data) => {
            router.push('/categories', { scroll: false })
        });
    }
    return <>
            <CategoryComponent
                mode={EMode.NEW}
                category={undefined}
                valuesArr={[]}
                categoryFunction={addNewCategory}
            />
    </>
}