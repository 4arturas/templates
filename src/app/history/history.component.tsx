import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {formatDate} from "@/app/utils";
import TablePagination from "@mui/material/TablePagination";


type Props = {
    history: Array<History>
}
export const HistoryComponent: React.FC<Props> = ({history}) => {

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = React.useMemo(
        () =>
            history.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage],
    );

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Subject</TableCell>
                            <TableCell align="center">To</TableCell>
                            <TableCell align="center">Icon</TableCell>
                            <TableCell align="center">Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row: History, index: number) => {
                            const jSonHist = JSON.parse(row.json);
                            let action: string;
                            if (row.actionId === 1) action = 'Temp. Update';
                            if (row.actionId === 2) action = 'Temp. Delete';
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {action}
                                    </TableCell>
                                    <TableCell align="center">{jSonHist.name}</TableCell>
                                    <TableCell align="center">{jSonHist.subject}</TableCell>
                                    <TableCell align="center">{jSonHist.to}</TableCell>
                                    <TableCell align="center">
                                        <i style={{width: '32px', height: '32px'}}
                                           className="material-icons">{jSonHist.icon}</i>
                                    </TableCell>
                                    <TableCell align="center">{formatDate(row.createdAt)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={history.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}