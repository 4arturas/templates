"use client";

import React from "react";
import {
    Box,
    Button, InputLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Typography, Stack
} from "@mui/material";
import {Add, PlusOne} from "@mui/icons-material";

type Props = {
    addNewCategory: (name: string, categoryData: Array<string>) => void
}
export const CategoryNewComponent: React.FC<Props> = ({addNewCategory}) => {

    const [name, setName] = React.useState<string>('')
    const [value, setValue] = React.useState<string>('');
    const [categoryData, setCategoryData] = React.useState<Array<string>>([])

    return (

            <table>
                <tbody>
                <tr>
                    <td colSpan={3}></td>
                </tr>
                <tr>
                    <td style={{width: '200px'}}><InputLabel>Category Name:</InputLabel></td>
                    <td><TextField label="Enter New Category Name Here" style={{width: '500px'}} value={name}
                                   onChange={(v) => setName(v.target.value)}/></td>
                    <td></td>
                </tr>
                <tr>
                    <td><InputLabel>New Category Value:</InputLabel></td>
                    <td><TextField label="Enter New Category Value Here" style={{width: '500px'}} value={value}
                                   onChange={(v) => setValue(v.target.value)}/></td>
                    <td>
                        <Button
                            variant="contained"
                            disabled={value.length === 0}
                            onClick={() => {
                                setCategoryData([...categoryData, value])
                                setValue('')
                            }}>
                            <Add/>
                        </Button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        {(categoryData.length > 0) &&
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categoryData.map((val, index) => (
                                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                      style={{backgroundColor: (index%2!==0)?'':'whitesmoke'}}
                                                      key={Math.random()}>
                                                <TableCell component="th" scope="row">
                                                    {val}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} style={{float: 'right'}}>
                        <Button variant="contained"
                                disabled={name.length === 0 || categoryData.length === 0}
                                onClick={() => addNewCategory(name, categoryData)}
                        >
                            Add New Category
                        </Button>
                    </td>
                </tr>
                </tbody>
            </table>

    );
}
