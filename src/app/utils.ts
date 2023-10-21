import {Category, CategoryData} from "@prisma/client";
import {cache} from "react";

export async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
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
    return response.json(); // parses JSON response into native JavaScript objects
}

export const getTemplates = cache(() =>
    fetch("http://localhost:3000/api/templates").then((res) => res.json())
);

export const getTemplate = (async (id: string): Promise<Category> => {
    const item = fetch(`http://localhost:3000/api/templates/${id}`).then((res) => res.json())
    return item
})

export const getTemplateCategories = (async (id: string) : Promise<Array<CategoryData>> => {
    return  fetch(`http://localhost:3000/api/templates/categories/${id}`).then((res) => res.json())
})

export const getCategories = cache(async () => {
    const item = fetch(`http://localhost:3000/api/categories`).then((res) => res.json())
    return item
})

export const getCategory = (async (id: string): Promise<Category> => {
    const item = fetch(`http://localhost:3000/api/categories/${id}`).then((res) => res.json())
    return item
})

export const getCategoryValues = (async (id: string) : Promise<Array<CategoryData>> => {
    return  fetch(`http://localhost:3000/api/categories/data/${id}`).then((res) => res.json())
})