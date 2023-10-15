"use client";

import {Category} from "@prisma/client";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {
    categories: Array<Category>
}
export const CategoriesComponent: React.FC<Props> = ({categories}) => {

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 0}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((catetory) => (
                            <TableRow
                                key={catetory.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {catetory.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Link href={`/categories/category/${catetory.id}`} passHref>
                                        View
                                    </Link>
                                    &nbsp;
                                    <Link href={`/categories/categories/${catetory.id}`} passHref>
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <Link href={`/categories/categories/${catetory.id}`} passHref>
                                        Delete
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
