"use client";

import {Category, CategoryData} from "@prisma/client";
import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Link from "next/link";

type Props = {
    category: Category | undefined,
    categoryData: Array<CategoryData>,
}
export const CategoryComponent: React.FC<Props> = ({category, categoryData}) => {
    return (
        <>
            <div>{category?.name}</div>
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
                        {categoryData.map((data) => (
                            <TableRow
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
                                    <Link href={`#`} passHref>
                                        Delete
                                    </Link>
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
