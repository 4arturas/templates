"use client";

import { useRouter } from 'next/navigation'
import React, {cache} from "react";
import {NewTemplateComponent} from "@/app/templates/new/newtemplate.component";
import {Category} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {EMethod, getCategories, postData} from "@/app/utils";


export default function TemplatesNewPage() {
    const router = useRouter();
    const [categories, setCategories] = React.useState<Array<Category>>();

    const createNewTemplate = (name:string, subject: string, to: string, icon: string, templateText: string, categoryArr:Array<string>) => {
        const data = { name: name, subject: subject, to: to, icon: icon, templateText: templateText, categoryArr: categoryArr };
        postData('http://localhost:3000/api/templates', EMethod.POST, data ).then((data) => {
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
            { !categories ?
                <CircularProgress />
                :
                <NewTemplateComponent
                    categories={categories}
                    createNewTemplate={createNewTemplate}
                />
            }
    </>
}