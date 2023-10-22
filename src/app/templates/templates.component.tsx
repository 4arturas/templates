"use client";

import { Template } from "@prisma/client";
import Link from "next/link";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    templates:Array<Template>
    deleteTemplateAndRedirect: (id:string) => void
}
export const TemplatesComponent: React.FC<Props> = ({templates, deleteTemplateAndRedirect}) => {


    return (
        <Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Template Name</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Icon</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {templates.map((template, index) => (
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            style={{backgroundColor: (index%2!==0)?'':'whitesmoke'}}
                            key={template.id}>
                            <TableCell component="th" scope="row">
                                {template.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {template.subject}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {template.to}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(template.icon)}`} />
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
                                <DeleteIcon
                                    onClick={(e)=> {
                                        // e.target.disabled = true;
                                        deleteTemplateAndRedirect(template.id);
                                    }}
                                    style={{cursor:'pointer'}}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}