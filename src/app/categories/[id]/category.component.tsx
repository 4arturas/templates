"use client";

import {Category, Value} from "@prisma/client";
import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel} from "@mui/material";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    category: Category | undefined,
    categoryData: Array<Value>,
    deleteValue: (id:string) => void
}
export const CategoryComponent: React.FC<Props> = ({category, categoryData, deleteValue}) => {
    return (
        <>
            <InputLabel>
                {category?.name}
            </InputLabel>
            { categoryData.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 0}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoryData.map((data, index) => (
                            <TableRow
                                style={{backgroundColor: (index%2!==0)?'':'whitesmoke'}}
                                key={data.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {data.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Link href={`#`} passHref>
                                        View
                                    </Link>
                                    &nbsp;
                                    <Link href={`#`} passHref>
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <DeleteIcon sx={{cursor:'pointer'}} onClick={()=>deleteValue(data.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </>
    );
}
