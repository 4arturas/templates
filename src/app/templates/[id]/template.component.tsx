"use client";

import {Category, CategoryValue, Template, User} from "@prisma/client";
import React, {cache, use} from "react";
import {
    Box,
    FormControl, InputLabel, MenuItem,
    Paper, Select, SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Link from "next/link";
import {ICategoryWithCategoryValue} from "@/app/utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
    template: Template
    categoryWithCategoryValue: Array<ICategoryWithCategoryValue>
}

export const TemplateComponent: React.FC<Props> = (
    {
        template,
        categoryWithCategoryValue
    }) => {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const [value, setValue] = React.useState(template.templateText);


    return (
            <Box sx={{width: '1000px'}}>
                <Typography><img src={`data:image/svg+xml;utf8,${encodeURIComponent(template.icon)}`} />&nbsp;{template.name}</Typography>
                <Typography>{template.subject}</Typography>
                <Typography>{template.to}</Typography>
                {categoryWithCategoryValue.map((categoryWithDataElement, index) => (
                    <FormControl variant="standard" sx={{m: 1, width: 120}} key={`formControl${categoryWithDataElement.category.id}`}>
                        <InputLabel id={categoryWithDataElement.category.id} key={`inputLabel${categoryWithDataElement.category.id}`}>
                            {categoryWithDataElement.category.name}
                        </InputLabel>
                        <Select
                            key={`select${categoryWithDataElement.category.id}`}
                            labelId={categoryWithDataElement.category.id}
                            id={categoryWithDataElement.category.id}
                            value={categoryWithDataElement.category.name}
                            label={categoryWithDataElement.category.name}
                        >
                            {categoryWithDataElement.data.map(categoryData =>
                                <MenuItem
                                    key={categoryData.id}
                                    value={categoryData.id}>
                                    {categoryData.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                ))}
                <ReactQuill theme="snow" value={value} onChange={setValue} />
            </Box>
    );
}