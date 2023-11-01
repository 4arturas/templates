import {Category, Template, Value} from "@prisma/client";
import {cache} from "react";

export enum EMethod {'POST' = 'POST', 'PUT' = 'PUT', 'DELETE' = 'DELETE', PATCH = 'PATCH'}

export interface ICategorySelect {
    name: string,
    categoryId: string,
    selectedValue: Array<string>,
    selectedCategoryValueId: Array<string>
}

export interface ICategoryMenuItem {
    name: string,
    categoryValueId: string,
    categoryId: string
}

export interface IOneTemplateHasManyValues {
    values: { id: string, name: string },
    category: { id: string, name: string }
}

export interface ITemplateResponse {
    id: string,
    name: string,
    to: string,
    subject: string,
    icon: string,
    templateText: string,
    OneTemplateHasManyValues: Array<IOneTemplateHasManyValues>
}

export async function postData(url = "", method: EMethod, data = {}) {
    // Default options are marked with *
    return await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
}

/*export const getTemplates = cache(() =>
    fetch("http://localhost:3000/templates/api").then((res) => res.json())
);*/