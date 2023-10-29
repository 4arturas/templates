"use client"

import {TemplatesComponent} from "@/app/templates/templates.component";
import React from "react";
import {CircularProgress} from "@mui/material";
import {deleteTemplate, EMethod, getTemplates, ITemplateResponse, postData} from "@/app/utils";

export default function TemplatesPage() {

    const [templates, setTemplates] = React.useState<Array<ITemplateResponse>>();

    async function fetchTemplates() {
        setTemplates(await getTemplates());
    }

    const deleteTemplateAndRedirect = (id:string) => {
        deleteTemplate(id).then((response)=>{
            setTemplates(undefined)
            fetchTemplates()
        })
    }


    React.useEffect( () => {
        fetchTemplates();
        // return () => { };
    }, []);

    return <>

        { !templates ?
            <CircularProgress />
            :
            <TemplatesComponent templates={templates} deleteTemplateAndRedirect={deleteTemplateAndRedirect} />

        }
    </>
}