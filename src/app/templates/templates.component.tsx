"use client";

import { Template } from "@prisma/client";
import Button from '@mui/material/Button';
import Link from "next/link";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";


type Props = {
    templates:Array<Template>
}
export const TemplatesComponent: React.FC<Props> = ({templates}) => {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Template Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {templates.map((template) => (
                        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={Math.random()}>
                            <TableCell component="th" scope="row">
                                {template.name}
                            </TableCell>
                            <TableCell align="right">
                                <Link href={`/templates/${template.id}`} passHref>
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
    );
}