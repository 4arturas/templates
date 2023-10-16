"use client";

import {CategoryNewComponent} from "@/app/components/categories/category/new/categorynew.component";
import { useRouter } from 'next/navigation'
import {postData} from "@/app/utils";

export default function CategoriesCategoryPage() {
    const router = useRouter();
    const addNewCategory = (name: string, categoryData: Array<string>) => {
        const data = { name: name, categoryData: categoryData };
        postData('http://localhost:3000/api/categories', data ).then((data) => {
            router.push('/categories', { scroll: false })
        });

    }
    return <>
        <h3>New category</h3>
        <div style={{width:'50%'}}>
            <CategoryNewComponent
                addNewCategory={addNewCategory}
            />
        </div>
    </>
}