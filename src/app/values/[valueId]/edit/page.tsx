"use client";

import React, {cache, use} from "react";
import {Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {getValueApi} from "@/app/values/api/[valueId]/route";
import {ValueEditComponent} from "@/app/values/[valueId]/edit/valueedit.component";
import {updateValueApi} from "@/app/values/api/route";
import {useRouter} from "next/navigation";


export default function ValuePage({ params }: {params: { valueId: string }; }) {
    // const categories = use<Category[]>(getCategories());
    const router = useRouter();

    const [value, setValue] = React.useState<Value>();

    const saveValueAndRedired = (id:string, name: string) => {
        setValue(undefined);
        updateValueApi(id, name).then( (data) => {
            router.push(`/values/${id}`, { scroll: false })
        })
    }

    async function fetchData() {
        const value:Value = await getValueApi(params.valueId);
        setValue(value);
    }

    React.useEffect(() => {
        fetchData();
        // return () => { };
    }, []);

    return <React.Fragment>
        {
            !value ?
                <CircularProgress/> :
                <ValueEditComponent value={value} saveNewValue={saveValueAndRedired}/>
        }
    </React.Fragment>
}