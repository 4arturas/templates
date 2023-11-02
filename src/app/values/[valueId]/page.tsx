"use client";

import React, {cache, use} from "react";
import {Value} from "@prisma/client";
import {CircularProgress} from "@mui/material";
import {getValueApi} from "@/app/values/api/[valueId]/route";
import {ValueComponent} from "@/app/values/[valueId]/value.component";


export default function ValuePage({ params }: {params: { valueId: string }; }) {
    // const categories = use<Category[]>(getCategories());

    const [value, setValue] = React.useState<Value>();

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
                <ValueComponent value={value}/>
        }
    </React.Fragment>
}