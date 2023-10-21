"use client";

import { useRouter } from 'next/navigation'
import React, {cache} from "react";
import {NewTemplateComponent} from "@/app/templates/new/newtemplate.component";
import {Category} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {getCategories, postData} from "@/app/utils";


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
            { categories.length === 0 ?
                <CircularProgress />
                :
                <NewTemplateComponent
                    categories={categories}
                    createNewTemplate={createNewTemplate}
                />
            }
    </>
}