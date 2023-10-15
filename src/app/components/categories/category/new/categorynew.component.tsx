"use client";

import React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";

type Props = {
    addNewCategory: (name: string, categoryData: Array<string>) => void
}
export const CategoryNewComponent: React.FC<Props> = ({ addNewCategory }) => {

    const [name, setName] = React.useState<string>('')
    const [value, setValue] = React.useState<string>('');
    const [categoryData, setCategoryData] = React.useState<Array<string>>([])

    const inputRef = React.useRef(null);

    return (
        <>
            <div key='div1'>
                <TextField label="Category Name" style={{width:'100%'}} value={name} onChange={(v) => setName(v.target.value) } />
            </div>
            <br/>
            <div key='div2'>
                <TextField label="New Category Value"  style={{width:'100%'}} value={value} onChange={(v) => setValue(v.target.value) } />
                <Button disabled={value.length===0} onClick={() => {
                    setCategoryData([...categoryData, value])
                    setValue('')
                }}>
                    Add New Category Value
                </Button>
            </div>
            <br/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoryData.map((val) => (
                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={Math.random()}>
                                <TableCell component="th" scope="row">
                                    {val}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                disabled={name.length===0 || categoryData.length === 0}
                onClick={() => addNewCategory(name, categoryData)}
            >
                Add New Category
            </Button>
        </>
    );
}
