"use client";

import {Category} from "@prisma/client";
import {
    Box,
    Button, MenuItem,
    Paper, Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs, Typography
} from "@mui/material";
import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {useRouter} from "next/navigation";
import {deleteCategory} from "@/app/utils";

type Props = {
    categories: Array<Category>
}
export const CategoriesComponent: React.FC<Props> = ({categories}) => {
    const router = useRouter();
    const deleteCategoryAndRedirect = async (id:string) => {
        deleteCategory(id).then(r=>{
            router.push(`/categories`, { scroll: false })
        })
    }
    return (
        <Box style={{width: '600px'}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 0}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category Name</TableCell>
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
                                <TableCell align="right">
                                    <Link href={`/categories/${category.id}`} passHref>
                                        View
                                    </Link>
                                    &nbsp;
                                    <Link href={`/categories/categories/${category.id}`} passHref>
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <DeleteIcon onClick={()=>deleteCategoryAndRedirect(category.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}