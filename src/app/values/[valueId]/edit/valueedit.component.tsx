"use client";

import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    InputLabel,
    TextField
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';
import {Value} from "@prisma/client";
import Button from "@mui/material/Button";

type Props = {
    value:Value
    saveNewValue: ( id: string, name: string) => void
}
export const ValueEditComponent: React.FC<Props> = ({value, saveNewValue}) => {
    const [name, setName] = React.useState<string>(value.name);
    const [nameOld, setOldName] = React.useState<string>(value.name);
    return (
        <>
            <TextField
                label="Value"
                variant="outlined"
                defaultValue={name}
                onChange={(v) => setName(v.target.value)}/>
            <Button variant="contained"
                    disabled={!name || name === nameOld}
                    onClick={()=>saveNewValue(value.id, name)}
            >
                Save New Value
            </Button>
        </>
    );
}
