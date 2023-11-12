"use client"

import {TemplatesOldComponent} from "@/app/templates/templates.old.component";
import React from "react";
import {CircularProgress} from "@mui/material";
import {ITemplateResponse, ITemplateResponseNew} from "@/app/utils";
import {deleteTemplateApi, getTemplatesApi} from "@/app/templates/api/route";
import {TemplatesNewComponent} from "@/app/templates/templates.new.component";

export default function TemplatesPage() {

    const [templates, setTemplates] = React.useState<{old:Array<ITemplateResponse>, new:Array<ITemplateResponseNew>}>();

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
            <React.Fragment>
                <TemplatesNewComponent templates={templates.new} deleteTemplateAndRedirect={deleteTemplateAndRedirect}/>
            {/*<TemplatesOldComponent templates={templates.old} templatesNew={templates.new} deleteTemplateAndRedirect={deleteTemplateAndRedirect} />*/}
            </React.Fragment>

        }
    </>
}