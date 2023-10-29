"use client";

import Link from "next/link";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import {ITemplateResponse} from "@/app/utils";

type Props = {
    templates:Array<ITemplateResponse>
    deleteTemplateAndRedirect: (id:string) => void
}

const VirtuosoTableComponents: TableComponents<any> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};


export const TemplatesComponent: React.FC<Props> = ({templates, deleteTemplateAndRedirect}) => {

    const [columns, setColumns] = React.useState<Array<any>>([]);
    const [rows, setRows] = React.useState<Array<any>>([]);

    function fixedHeaderContent() {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align={column.numeric || false ? 'right' : 'left'}
                        style={{ width: column.width }}
                        sx={{
                            backgroundColor: 'background.paper',
                        }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    }

    function rowContent(_index: number, row: any) {
        return (
            <React.Fragment>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? 'right' : 'left'}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    React.useEffect(() => {
        const uniqueCategoryTmp = new Map<string,string>()
        templates.map( (template: ITemplateResponse) => {
            template.OneTemplateHasManyCategoryValues.map( o => {
                const category:{id:string, name:string} = o.category;
                uniqueCategoryTmp.set(category.id, category.name);
            })
        })

        const tmpRows: Array<any> = [];
        templates.map( (template: ITemplateResponse) => {
            let tmpRow:any ={
                id: template.id,
                name: template.name,
                subject: template.subject,
                to: template.to,
                icon: <img src={`data:image/svg+xml;utf8,${encodeURIComponent(template.icon)}`} />,
                actions: <div>
                    <Link href={`#`} passHref>
                        View
                    </Link>
                    &nbsp;
                    <Link href={`/templates/${template.id}`} passHref>
                        Edit
                    </Link>
                    &nbsp;
                    <DeleteIcon
                        onClick={(e)=> {
                            // e.target.disabled = true;
                            deleteTemplateAndRedirect(template.id);
                        }}
                        style={{cursor:'pointer'}}
                    /></div>
            };
            uniqueCategoryTmp.forEach((categoryName/*value*/, categoryId/*key*/) => {
                const OneTemplateHasManyCategoryValues = template.OneTemplateHasManyCategoryValues;
                const categoryValueNameArr = OneTemplateHasManyCategoryValues
                    .filter( f => f.category.name === categoryName )
                    .map( m => m.categoryValue )
                    .map( m => m.name );
                tmpRow[categoryName] = categoryValueNameArr.join(',');
            })
            tmpRows.push(tmpRow);
        });

        const tmpColumns: any[] = [
            {
                width: 200,
                label: 'Template Name',
                dataKey: 'name',
            },
            {
                width: 120,
                label: 'Subject',
                dataKey: 'subject',
                numeric: false,
            },
            {
                width: 120,
                label: 'To',
                dataKey: 'to',
                numeric: false,
            },
            {
                width: 120,
                label: 'Icon',
                dataKey: 'icon',
                numeric: false,
            }
        ];
        uniqueCategoryTmp.forEach((categoryName/*value*/, categoryId/*key*/) => {
            tmpColumns.push({width: 100, label: categoryName, dataKey: categoryName, numeric: false })
        })
        tmpColumns.push({width: 100, label: 'Actions', dataKey: 'actions', numeric: false })


        setColumns(tmpColumns);
        setRows(tmpRows)

    }, []);


    return (
        <Box style={{width:'2000px'}}>
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </Box>
    );
}