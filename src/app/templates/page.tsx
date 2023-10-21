"use client"

import {TemplatesComponent} from "@/app/templates/templates.component";
import Button from '@mui/material/Button';
import Link from "next/link";
import React, {cache, use} from "react";
import {Category, Template} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {CategoriesComponent} from "@/app/categories/categories.component";
import {getTemplates} from "@/app/utils";

export default function TemplatesPage() {
    // let templates = use<Template[]>(getTemplates());

    const [templates, setTemplates] = React.useState<Array<Template>>([]);

    React.useEffect( () => {
        async function startFetching() {
            setTemplates(await getTemplates());
        }
        startFetching();
        return () => { };
    }, []);

    return <>

        { templates.length === 0 ?
            <CircularProgress />
            :
            <TemplatesComponent templates={templates}/>

        }
    </>
}