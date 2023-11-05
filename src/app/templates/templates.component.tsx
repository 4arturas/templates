"use client";

import Link from "next/link";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, ListItemText
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {TableVirtuoso, TableComponents} from 'react-virtuoso';
import {
    formatDate,
    ICategorySelect,
    ICategorySelectItem,
    IOneTemplateHasManyValues,
    ITemplateResponse
} from "@/app/utils";
import EditIcon from "@mui/icons-material/Edit";

interface ITmpInterface {
    category: { id: string, name: string },
    values: { id: string, name: string }
}

type Props = {
    templates: Array<ITemplateResponse>
    deleteTemplateAndRedirect: (id: string) => void
}

const VirtuosoTableComponents: TableComponents<any> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref}/>
    )),
    Table: (props) => (
        <Table {...props} sx={{borderCollapse: 'separate', tableLayout: 'fixed'}}/>
    ),
    TableHead,
    TableRow: ({item: _item, ...props}) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref}/>
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
                        style={{width: column.width}}
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

    const [categorySelectArr, setCategorySelectArr] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectItemArr, setCategorySelectItemArr] = React.useState<Array<ICategorySelectItem>>([]);
    const [selectedElements, setSelectedElements] = React.useState<Array<ICategorySelect>>([]);

    const [groupedCategories, setGroupedCategories] = React.useState<{[key:string]:Array<ITmpInterface>}>({});
    const onSelectionChange = (event: SelectChangeEvent<Array<string>>, group: ICategorySelect) => {
        //const {target: { value },} = event;
        const value = event.target.value;

        selectedElements.map((item) => {
            if (item.categoryId === group.categoryId) {
                item.selectedValue = typeof value === "string" ? value.split(",") : value;
            }
        });

        setSelectedElements([...selectedElements]);

        initTable(groupedCategories, selectedElements)
    };



    function initTable(groupedCategories:{[key:string]:Array<ITmpInterface>}, selected:Array<ICategorySelect>) {
        const tmpRows: Array<any> = [];
        const categoryArrayForShowing:Array<string> = [];
        templates.map((template: ITemplateResponse) => {
            let tmpRow: any = {
                id: template.id,
                name: template.name,
                subject: template.subject,
                to: template.to,
                icon: <i style={{width: '32px', height: '32px'}} className="material-icons">{template.icon}</i>,
                deletedAt: formatDate(template?.deletedAt),
                actions: <div>
                    <Link href={`/templates/${template.id}/edit`} passHref>
                        <EditIcon style={{cursor: 'pointer'}}/>
                    </Link>
                    &nbsp;
                    <DeleteIcon
                        onClick={(e) => {
                            // e.target.disabled = true;
                            deleteTemplateAndRedirect(template.id);
                        }}
                        style={{cursor: 'pointer'}}
                    /></div>
            };



            Object.keys((groupedCategories)).map((categoryId: string) => {
                const hashMapValue: Array<ITmpInterface> = groupedCategories[categoryId];
                const categoryName = hashMapValue.map(m => m.category).find(f => f.id === categoryId)?.name || 'Should not be like this';
                const OneTemplateHasManyValues = template.OneTemplateHasManyValues;
                const categoryValueArr = OneTemplateHasManyValues
                    .filter(f => f.category.id === categoryId)
                    .map((m: IOneTemplateHasManyValues) => m.values);
                const categoryValueNameArr: Array<string> = categoryValueArr.map((m: { id: string, name: string }) => m.name);
                tmpRow[categoryName] = categoryValueNameArr.join(',');


                categoryArrayForShowing.push( ...categoryValueNameArr );
            })
            console.log( 'categoryArrayForShowing', categoryArrayForShowing, 'selectedElements', selectedElements.map( m => m.selectedValue ) );
            tmpRows.push( tmpRow );

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

        Object.keys((groupedCategories)).map((categoryId: string) => {
            const value: Array<ITmpInterface> = groupedCategories[categoryId];
            const categoryName = value.map(m => m.category).find(f => f.id === categoryId)?.name || 'Should not be like this';
            tmpColumns.push({width: 100, label: categoryName, dataKey: categoryName, numeric: false})
        })

        tmpColumns.push({width: 100, label: 'Deleted At', dataKey: 'deletedAt', numeric: false})
        tmpColumns.push({width: 100, label: 'Actions', dataKey: 'actions', numeric: false})


        setColumns(tmpColumns);
        setRows(tmpRows)
    }

    React.useEffect(() => {


        const tmpGroupedCategories:{[key:string]:Array<ITmpInterface>} = templates
            .flatMap(f => f.OneTemplateHasManyValues)
            .reduce((group: { [key: string]: Array<ITmpInterface> }, item) => {
                if (!group[item.category.id]) {
                    group[item.category.id] = [];
                }
                group[item.category.id].push(item);
                return group;
            }, {});

        const tmpCategorySelectArr: Array<ICategorySelect> = [];
        const tmpCategorySelectItemArr: Array<ICategorySelectItem> = [];
        Object.keys((tmpGroupedCategories)).map((categoryId: string) => {
            const value: Array<ITmpInterface> = tmpGroupedCategories[categoryId];

            value.map((v) => {
                tmpCategorySelectItemArr.push({name: v.values.name, categoryValueId: v.values.id, categoryId: v.category.id})
            })

            const categoryName = value.map(m => m.category).find(f => f.id === categoryId)?.name || 'Should not be like this';
            tmpCategorySelectArr.push({
                    categoryId: categoryId,
                    name: categoryName,
                    selectedCategoryValueId: [categoryId],
                    selectedValue: value.map(m => m.values).map(m => m.name)
                }
            );
        })

        setGroupedCategories( tmpGroupedCategories );
        setCategorySelectArr(tmpCategorySelectArr);
        setCategorySelectItemArr(tmpCategorySelectItemArr);
        setSelectedElements(tmpCategorySelectArr);
        ///////////////////////////////////

        initTable(tmpGroupedCategories, tmpCategorySelectArr);


    }, []);


    return (
        <Box style={{width: '100%', height: '100%'}}>
            <Paper style={{height: 400, width: '100%'}}>
                <Box style={{width: '100%', textAlign: 'center'}}>
                    {(categorySelectArr.length > 0 && categorySelectItemArr.length > 0 && categorySelectItemArr.length > 0) &&
                        selectedElements.map(function (group) {
                            return (
                                <FormControl key={`formControl${group.categoryId}`} variant="standard"
                                             sx={{m: 1, width: 300, mt: 3}}>
                                    <InputLabel id={`label${group.categoryId}`}>{group.name}</InputLabel>
                                    <Select
                                        labelId={`label${group.categoryId}`}
                                        key={`select${group.categoryId}`}
                                        multiple
                                        value={group?.selectedValue || []}
                                        onChange={(e) => onSelectionChange(e, group)}
                                        id={group.categoryId}
                                        renderValue={(selected) => selected.join(", ")}
                                    >
                                        {categorySelectItemArr.map(function (option) {
                                            if (option.categoryId === group.categoryId) {
                                                return (
                                                    <MenuItem key={`menuItem${option.categoryValueId}`}
                                                              value={option.name} id={option.categoryValueId}>
                                                        <ListItemText key={`listItemText${option.categoryValueId}`}
                                                                      primary={option.name}/>
                                                    </MenuItem>
                                                );
                                            }
                                        })}
                                    </Select>
                                </FormControl>
                            );
                        })}
                </Box>
                <TableVirtuoso
                    style={{height: '100%', width: '100%'}}
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </Box>
    );
}