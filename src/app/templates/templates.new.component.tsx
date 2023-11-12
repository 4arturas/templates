import {EMode, ICategorySelect, ICategorySelectItem, ICategoryWithValues, ITemplateResponseNew} from "@/app/utils";
import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {
    FormControl,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {Search} from "@mui/icons-material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";


interface Data {
    id: number;
    subject: string;
    name: string;
    to: string;
    icon: string;
    actions: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}


interface EnhancedTableProps {
    headCells: Array<HeadCell>,
    rows: Array<Data>,
    searchPhrase: string | undefined
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({headCells, rows, searchPhrase}) => {
    interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
        order: Order;
        orderBy: string;
        rowCount: number;
    }

    function EnhancedTableHead(props: EnhancedTableProps) {
        const {order, orderBy, numSelected, rowCount, onRequestSort} =
            props;
        const createSortHandler =
            (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'center' : 'center'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }


    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const emphasizeSearchFragment = (attribute:string, phrase:string|undefined) => {
        if ( phrase === undefined )
            return attribute;
        const str:string = String(attribute);
        if ( str.length === 0 )
            return String(attribute);


        const begin = str.indexOf(phrase);
        if ( begin === -1 )
            return attribute;

        const regEx = new RegExp(phrase, "ig");
        const regExArray = [];
        let resultString = attribute;
        for ( let i = 0; i < 100; i++ )
        {
            const tmpRegExElement = regEx.exec(attribute);
            if ( tmpRegExElement === null )
                break;
            const key = tmpRegExElement[0];
            const value = String(Math.random());
            regExArray.push({key:key, value:value});
            resultString = resultString.replaceAll( key, value );
        }

        regExArray.forEach( elem =>{
            resultString = resultString.replaceAll(elem.value, `<span style="color:red;font-weight:bold">${elem.key}</span>`)
        } )

        return resultString;
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>

                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {
                                visibleRows.map((row, index) => {
                                    const regEx = new RegExp((searchPhrase===undefined)?'':searchPhrase, "ig");
                                    // const renderRow: boolean = searchPhrase === undefined || searchPhrase.length === 0 ? true : (regEx.test(row.name) || regEx.test(row.subject) || regEx.test(row.to));
                                    if ( searchPhrase !== undefined && searchPhrase.length >= 0)
                                    {
                                        if ((!regEx.test(row.name) && !regEx.test(row.subject) && !regEx.test(row.to)))
                                            return <></>
                                    }

                                    return (
                                        <TableRow
                                            key={row.id}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            {Object.keys(row).filter(r => r !== 'id').map(r => {
                                                if  (r === 'icon')
                                                    return <TableCell align="center">
                                                                <i style={{width: '32px', height: '32px'}} className="material-icons">{row[r]}</i>
                                                            </TableCell>;
                                                if ( r==='actions')
                                                    return <TableCell align="center">
                                                        <Link href={`/templates/${row['id']}/edit`} passHref>
                                                            <EditIcon style={{cursor: 'pointer'}}/>
                                                        </Link>
                                                        &nbsp;
                                                        <DeleteIcon
                                                            onClick={(e) => {
                                                                // e.target.disabled = true;
                                                                deleteTemplateAndRedirect(template.id);
                                                            }}
                                                            style={{cursor: 'pointer'}}
                                                        />
                                                    </TableCell>;

                                                return <TableCell align="center">{row[r]}</TableCell>
                                                /*return <TableCell align="center">
                                                            <span dangerouslySetInnerHTML={{__html: emphasizeSearchFragment(row[r], searchPhrase)}} />
                                                        </TableCell>*/

                                            })}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}


type Props = {
    templates: Array<ITemplateResponseNew>,
    deleteTemplateAndRedirect: (id: string) => void
}

export const TemplatesNewComponent: React.FC<Props> = ({templates, deleteTemplateAndRedirect}) => {

    const [headCells, setHeadCells] = React.useState<Array<HeadCell>>([]);
    const [rows, setRows] = React.useState<Array<Data>>([]);

    const [categorySelectArr, setCategorySelectArr] = React.useState<Array<ICategorySelect>>([]);
    const [categorySelectItemArr, setCategorySelectItemArr] = React.useState<Array<ICategorySelectItem>>([]);
    const [selectedElements, setSelectedElements] = React.useState<Array<ICategorySelect>>([]);

    const [searchPhrase, setSearchPhrase] = React.useState<string | undefined>(undefined)

    interface ITmpInterface {
        category: { id: string, name: string },
        values: { id: string, name: string }
    }

    const [groupedCategories, setGroupedCategories] = React.useState<{ [key: string]: Array<ITmpInterface> }>({});
    const onSelectionChange = (event: SelectChangeEvent<Array<string>>, group: ICategorySelect) => {
        //const {target: { value },} = event;
        const value = event.target.value;

        selectedElements.map((item) => {
            if (item.categoryId === group.categoryId) {
                item.selectedValue = typeof value === "string" ? value.split(",") : value;
            }
        });

        setSelectedElements([...selectedElements]);

        // initTable(groupedCategories, selectedElements)
    };

    React.useEffect(() => {

        initFilters(templates);
        initTable(templates);


    }, [])

    const getUniqueCategories = (): { [key: string]: string } => {
        const uniqueCategories: { [key: string]: string } = {};
        for (let i = 0; i < templates.length; i++) {
            const template: ITemplateResponseNew = templates[i];
            const categories: Array<ICategoryWithValues> = template.categories;
            for (let j = 0; j < categories.length; j++) {
                const category: ICategoryWithValues = categories[j];
                const name = uniqueCategories[category.name];
                if (!name)
                    uniqueCategories[category.name] = category.name;
            }
        } // end for i
        return uniqueCategories;
    }
    const initFilters = (templates: ITemplateResponseNew[]) => {
        //////////////////////////////////////////////
        const tmpGroupedCategories: { [key: string]: Array<ITmpInterface> } = templates
            .flatMap((f: ITemplateResponseNew) => f.categories)
            .reduce((group: { [key: string]: Array<ITmpInterface> }, item) => {
                if (!group[item.id]) {
                    group[item.id] = [];
                    const category: { id: string, name: string } = {id: item.id, name: item.name};
                    for (let i = 0; i < item.values.length; i++) {
                        const value: { id: string, name: string } = item.values[i];
                        const t: ITmpInterface = {category: category, values: value}
                        group[item.id].push(t);
                    }
                }
                return group;
            }, {});
        const tmpCategorySelectArr: Array<ICategorySelect> = [];
        const tmpCategorySelectItemArr: Array<ICategorySelectItem> = [];
        Object.keys((tmpGroupedCategories)).map((categoryId: string) => {
            const value: Array<ITmpInterface> = tmpGroupedCategories[categoryId];

            value.map((v) => {
                tmpCategorySelectItemArr.push({
                    name: v.values.name,
                    categoryValueId: v.values.id,
                    categoryId: v.category.id
                })
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

        setGroupedCategories(tmpGroupedCategories);
        setCategorySelectArr(tmpCategorySelectArr);
        setCategorySelectItemArr(tmpCategorySelectItemArr);
        setSelectedElements(tmpCategorySelectArr);
        //////////////////////////////////////////////
    }

    const initTable = (templates: ITemplateResponseNew[]) => {
        const uniqueCategories: { [key: string]: string } = getUniqueCategories();
        const headCells: HeadCell[] = [
            {
                id: 'name',
                numeric: false,
                disablePadding: true,
                label: 'Name',
            },
            {
                id: 'subject',
                numeric: false,
                disablePadding: false,
                label: 'Subject',
            },
            {
                id: 'to',
                numeric: false,
                disablePadding: false,
                label: 'To',
            },
            {
                id: 'icon',
                numeric: false,
                disablePadding: false,
                label: 'Icon',
            }
        ];

        Object.keys(uniqueCategories).forEach((categoryName: string) => {
            const headCell: any = {
                id: categoryName.toLowerCase().replace(' ', '_'),
                numeric: false,
                disablePadding: false,
                label: categoryName,
            };
            headCells.push(headCell)
        })
        const actionsHeadCell: HeadCell = {
            id: 'actions',
            numeric: false,
            disablePadding: false,
            label: 'Actions',
        };
        headCells.push(actionsHeadCell)

        setHeadCells(headCells);

        const rowsArray: Array<any> = [];
        for (let i: number = 0; i < templates.length; i++) {
            const template: ITemplateResponseNew = templates[i];
            const row: any = {
                id: template.id,
                name: template.name,
                subject: template.subject,
                to: template.to,
                icon: template.icon
            };

            Object.keys(uniqueCategories).forEach((categoryName: string) => {
                row[categoryName.toLowerCase().replace(' ', '_')] =
                    template
                        .categories
                        .find(f => f.name === categoryName)
                        ?.values.map(m => m.name)
                        .join(',');
            })
            row['actions'] = 'Actions TODO'
            rowsArray.push(row);
        }
        console.log(rowsArray.length);
        setRows(rowsArray)
    }

    return (
        <>
            <Box style={{width: '100%', textAlign: 'center'}}>
                <TextField
                    label="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                        ),
                    }}
                    style={{marginTop: '16px', marginRight: '10px'}}
                    value={searchPhrase}
                    autoComplete={'off'}
                    onChange={(v) => setSearchPhrase(v.target.value)}/>
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
            {
                rows.length > 0 &&
                <React.Fragment>
                    <EnhancedTable headCells={headCells} rows={rows} searchPhrase={searchPhrase}/>
                </React.Fragment>
            }
        </>
    );
}