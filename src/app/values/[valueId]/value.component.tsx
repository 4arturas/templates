"use client";

import React from "react";
import {InputLabel} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Value} from "@prisma/client";
import Link from "next/link";

type Props = {
    value:Value
}
export const ValueComponent: React.FC<Props> = ({value}) => {
    return (
        <table>
            <tbody>
            <tr>
                <td>
                    <InputLabel>
                        {value.name}
                    </InputLabel>
                </td>
                <td>
                    <Link href={`/values/${value.id}/edit`} passHref style={{display:'inline'}}>
                        <EditIcon style={{cursor:'pointer', display:'inline'}} />
                    </Link>
                </td>
            </tr>
            </tbody>
        </table>
    );
}
