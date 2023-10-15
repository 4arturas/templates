"use client";

import {CategoryNewComponent} from "@/app/components/categories/category/new/categorynew.component";
import { useRouter } from 'next/navigation'
import React, {cache} from "react";
import {NewtTemplateComponent} from "@/app/components/templates/newtemplate.component";
import {Category} from "@prisma/client";

const getCategories = cache(async () : Promise<Array<Category>> => {
    return await fetch(`http://localhost:3000/api/categories`).then((res) => res.json())
})

export default function TemplatesNewPage() {
    const router = useRouter();
    const [categories, setCategories] = React.useState<Array<Category>>([]);

    React.useEffect( () => {
        async function startFetching() {
            setCategories(await getCategories());
        }
        startFetching();
        return () => { };
    }, []);

    return <>
        <h3>New Template</h3>
        <div style={{width:'50%'}}>
            <NewtTemplateComponent categories={categories}/>
        </div>
    </>
}