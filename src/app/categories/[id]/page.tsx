"use client";

import React, {cache} from "react";
import {CategoryComponent} from "@/app/components/categories/category/category.component";
import {Category} from "@prisma/client";

const getCategory = cache(async (id: string) => {
    const item = fetch(`http://localhost:3000/api/categories/${id}`).then((res) => res.json())
    return item
})
export default function CategoriesCategory( { params }: {params: { id: string }; } ) {

    const [category, setCategory] = React.useState<Category>();

    React.useEffect( () => {
        async function startFetching() {
            setCategory(await getCategory(params.id));
        }
        return () => { };
    }, []);


    return <div>
        <div>Category {params.id}</div>
        <CategoryComponent category={category} categoryData={[]}/>
    </div>
}