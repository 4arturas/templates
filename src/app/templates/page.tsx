"use client"

import {TemplatesComponent} from "@/app/templates/templates.component";
import React from "react";
import {Template} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {deleteTemplate, EMethod, getTemplates, postData} from "@/app/utils";
import {useRouter} from "next/navigation";

export default function TemplatesPage() {
    // let templates = use<Template[]>(getTemplates());
    const router = useRouter();

    const [templates, setTemplates] = React.useState<Array<Template>>();

    const deleteTemplateAndRedirect = (id:string) => {
        deleteTemplate(id).then((response)=>{
            // router.push(`/templates`, { scroll: false })
            router.refresh()
        })
    }


    React.useEffect( () => {
        async function startFetching() {
            setTemplates(await getTemplates());
        }
        startFetching();
        return () => { };
    }, []);

    return <>

        { !templates ?
            <CircularProgress />
            :
            <TemplatesComponent templates={templates} deleteTemplateAndRedirect={deleteTemplateAndRedirect} />

        }
    </>
}