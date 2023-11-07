"use client";

import React from "react";
import {
    Button,
    CircularProgress,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {Add} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import {Category, Value} from "@prisma/client";
import {EMode} from "@/app/utils";

type Props = {
    mode: EMode
    category: Category | undefined,
    valuesArr: Array<Value>,
    categoryFunction: (category: Category, values: Array<Value>) => void
}
export const CategoryComponent: React.FC<Props> = ({mode, category, valuesArr, categoryFunction}) => {

    const [categoryName, setCategoryName] = React.useState<string>(category?.name || '')
    const [value, setValue] = React.useState<string>('');
    const [values, setValues] = React.useState<Array<Value>>(valuesArr)
    const [deletedValues, setDeletedValues] = React.useState<Array<string>>([]);
    const [processing, setProcessing] = React.useState<boolean>(false);

    return (

        <table>
            <tbody>
            <tr>
                <td style={{width: '200px'}}>
                    <InputLabel>
                        Category Name:
                    </InputLabel></td>
                <td>
                    <TextField
                        disabled={mode === EMode.VIEW}
                        label="Category Name"
                        style={{width: '500px'}}
                        value={categoryName}
                        onChange={(v) => setCategoryName(v.target.value)}/>
                </td>
                <td></td>
            </tr>
            { mode !== EMode.VIEW &&
                <tr>
                    <td><InputLabel>Category Value:</InputLabel></td>
                    <td><TextField label="Enter New Category Value Here" style={{width: '500px'}} value={value}
                                   onChange={(v) => setValue(v.target.value)}/></td>
                    <td>

                        <Button
                            variant="contained"
                            disabled={value.length === 0 || (values.filter(f => f.name === value).length !== 0)}
                            onClick={() => {
                                setValues([...values, {
                                    id: '',
                                    name: value,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    deletedAt: null
                                }])
                                setValue('')
                            }}>
                            <Add/>
                        </Button>
                    </td>
                </tr>
            }
            <tr>
                <td colSpan={3}>
                    {(values.length > 0) &&
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {values?.map((val, index) => (
                                        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                  style={{backgroundColor: (index % 2 !== 0) ? '' : 'whitesmoke'}}
                                                  key={Math.random()}>
                                            <TableCell component="th" scope="row">
                                                    <span
                                                        key={`valueName${index}`}
                                                        style={{textDecorationLine: deletedValues.filter(f => f === val.name).length === 0 ? '' : 'line-through'}}
                                                    >
                                                        {val.name}
                                                    </span>

                                                {(mode !== EMode.VIEW && deletedValues.filter(f => f === val.name).length === 0) &&
                                                    <Button
                                                        key={`delete${index}`}
                                                        variant="contained"
                                                        style={{float: 'right'}}
                                                        onClick={() => {
                                                            setDeletedValues([...deletedValues, val.name])
                                                        }}
                                                    >
                                                        <DeleteIcon/>

                                                    </Button>
                                                }
                                                {(mode !== EMode.VIEW && deletedValues.filter(f => f === val.name).length === 1) &&
                                                    <Button
                                                        key={`deleteTmp${index}`}
                                                        variant="contained"
                                                        style={{float: 'right'}}
                                                        onClick={() => {
                                                            const tmp: Array<string> = deletedValues.filter(f => f !== val.name);
                                                            setDeletedValues(tmp);
                                                        }}
                                                    >
                                                        <ReplayCircleFilledIcon/>
                                                    </Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </td>
            </tr>
            {mode !== EMode.VIEW &&
                <tr>
                    <td colSpan={3} style={{float: 'right'}}>
                        {
                            processing ? <CircularProgress/> :
                                <Button
                                    variant="contained"
                                    disabled={categoryName.length === 0 || values.length === 0}
                                    onClick={() => {
                                        setProcessing(true);
                                        const categoryId: string = category ? category.id : '-1';
                                        const valuesToDelete: Array<Value> = values.filter(f => !deletedValues.includes(f.name));
                                        categoryFunction({
                                            id: categoryId,
                                            name: categoryName,
                                            createdAt: new Date(),
                                            deletedAt: null,
                                            updatedAt: new Date()
                                        }, valuesToDelete);
                                    }
                                    }>
                                    {category ? 'Edit Category' : 'Add New Category'}
                                </Button>
                        }
                    </td>
                </tr>
            }
            </tbody>
        </table>

    );
}
