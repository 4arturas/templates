import {Category, Value} from "@prisma/client";

export const category:Category = {id: '1', name: 'Country', createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
export const valuesArr:Value[] = [
    {id: '1', name: 'LT', createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
    {id: '2', name: 'DK', createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
]