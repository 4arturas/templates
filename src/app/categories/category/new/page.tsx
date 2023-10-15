"use client";

import {
    TextField,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import {CategoryData} from "@prisma/client";
import React from "react";

export default function CategoriesCategoryNew() {
    const [categoryData, setCategoryData] = React.useState<Array<CategoryData>>([]);

    return <div>
        <div>Create new Category</div>
        <TextField id="outlined-basic" label="Category Name" variant="outlined" />
        <Button>Create</Button>
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
                                Edit Delete
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}