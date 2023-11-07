"use client";

import {Category} from "@prisma/client";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Face5Icon from '@mui/icons-material/Face5';
import {formatDate} from "@/app/utils";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from '@mui/icons-material/FileCopy';

type Props = {
    categories: Array<Category>,
    deleteCategory: (id:string) => void
}
export const CategoriesComponent: React.FC<Props> = ({categories, deleteCategory}) => {

    return (
        <Box style={{width: '600px'}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 0}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Deleted At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category, index) => (
                            <TableRow
                                key={category.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                style={{backgroundColor: (index%2!==0)?'':'whitesmoke'}}
                            >
                                <TableCell component="th" scope="row">
                                    {category.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {formatDate(category?.deletedAt)}
                                </TableCell>
                                <TableCell align="right">
                                    <Link href={`/categories/${category.id}`} passHref>
                                        <Face5Icon />
                                    </Link>
                                    &nbsp;
                                    <Link href={`/categories/${category.id}/edit`} passHref>
                                        <EditIcon sx={{cursor:'pointer'}} />
                                    </Link>
                                    &nbsp;
                                    <FileCopyIcon sx={{cursor:'pointer'}} onClick={()=>{alert('TODO: implement clone function')}} />
                                    &nbsp;
                                    <DeleteIcon sx={{cursor:'pointer'}} onClick={()=>deleteCategory(category.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
