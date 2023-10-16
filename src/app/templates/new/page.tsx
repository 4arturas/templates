"use client";

import { useRouter } from 'next/navigation'
import React, {cache} from "react";
import {NewtTemplateComponent} from "@/app/components/templates/newtemplate.component";
import {Category} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {postData} from "@/app/utils";

const getCategories = cache(async () : Promise<Array<Category>> => {
    return await fetch(`http://localhost:3000/api/categories`).then((res) => res.json())
})

export default function TemplatesNewPage() {
    const router = useRouter();
    const [categories, setCategories] = React.useState<Array<Category>>([]);

    const createNewTemplate = (name:string, categoryArr:Array<string>) => {
        const data = { name: name, categoryArr: categoryArr };
        postData('http://localhost:3000/api/templates', data ).then((data) => {
            router.push('/templates', { scroll: false })
        });
    }

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
            { categories.length === 0 ?
                <CircularProgress />
                :
                <NewtTemplateComponent
                    categories={categories}
                    createNewTemplate={createNewTemplate}
                />
            }
        </div>
    </>
}