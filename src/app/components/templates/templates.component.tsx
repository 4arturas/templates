"use client";

import { Template } from "@prisma/client";
import Button from '@mui/material/Button';
import Link from "next/link";


type Props = {
    templates:Array<Template>
}
export const TemplatesComponent: React.FC<Props> = ({templates}) => {

    return (
        <>
            { templates && 'No templates'}
            {templates.map((template) => (
                <div key={template.id}>
                    <h3>{template.name}</h3>
                </div>
            ))}
        </>
    );
}