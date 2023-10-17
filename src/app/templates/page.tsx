"use client"

import {TemplatesComponent} from "@/app/components/templates/templates.component";
import Button from '@mui/material/Button';
import Link from "next/link";
import React, {cache, use} from "react";
import {Category, Template} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {CategoriesComponent} from "@/app/components/categories/categories.component";

const getTemplates = cache(() =>
    fetch("http://localhost:3000/api/templates").then((res) => res.json())
);
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

    return <div>
        <h3>Templates Component</h3>

        { templates.length === 0 ?
            <CircularProgress />
            :
            <>
                <Link href="/templates/new" passHref>
                    <Button>Create New Template</Button>
                </Link>
                <TemplatesComponent templates={templates}/>
            </>

        }
    </div>
}