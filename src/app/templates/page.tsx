"use client"

import React from "react";
import {CircularProgress} from "@mui/material";
import {IDBTemplateWithCategoriesAndValues, ITemplateResponseNew} from "@/app/utils";
import {deleteTemplateApi, getTemplatesApi} from "@/app/templates/api/route";
import {TemplatesComponent} from "@/app/templates/templates.component";

export default function TemplatesPage() {

    const [templates, setTemplates] = React.useState<Array<ITemplateResponseNew>>();

    async function fetchTemplates() {
        setTemplates(await getTemplatesApi());
    }

    const deleteTemplateAndRedirect = (id:string) => {
        deleteTemplateApi(id).then((response)=>{
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
            <TemplatesComponent templates={templates} deleteTemplateAndRedirect={deleteTemplateAndRedirect}/>


        }
    </>
}