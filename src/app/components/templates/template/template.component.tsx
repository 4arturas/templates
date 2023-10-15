"use client";

import { Template } from "@prisma/client";
import React, { cache, use } from "react";
import {NextPage} from "next";

/*const getTemplate = cache(() =>
    fetch("http://localhost:3000/api/templates").then((res) => res.json())
);*/

export const getTemplate = cache(async (id: string) => {
    const item = fetch(`http://localhost:3000/api/templates/${id}`).then((res) => res.json())
    return item
})
type Props = {
    id: string
}
export const TemplateComponent: React.FC<Props> = ({ id }) => {
    let template = use<Template>(getTemplate('1'));
    console.log( template );

    return (
        <span>
            Template - {id}

        </span>
    );
}
/*
export default function TemplateComponent2( id: string) {
    let template = use<Template>(getTemplate('1'));

    return (
        <span
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 20,
            }}
        >
            Template
            {template.id} - {template.name}
        </span>
    );
}*/
