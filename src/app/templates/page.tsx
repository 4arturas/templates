import {TemplatesComponent} from "@/app/components/templates/templates.component";
import Button from '@mui/material/Button';
import Link from "next/link";
import {cache, use} from "react";
import {Template} from "@prisma/client";

const getTemplates = cache(() =>
    fetch("http://localhost:3000/api/templates").then((res) => res.json())
);
export default function TemplatesPage() {
    let templates = use<Template[]>(getTemplates());
    const handleClick = (value:string) => () => {
        console.log(value);
    }

    return <div>
        <h3>Templates Component</h3>
        <Link href="/templates/new" passHref>
            <Button>Create New Template</Button>
        </Link>
        <TemplatesComponent templates={templates}/>
    </div>
}