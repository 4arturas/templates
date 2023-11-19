"use client";

import React from "react";
import {getHistoryApi} from "@/app/history/api/route";
import {CircularProgress} from "@mui/material";
import {HistoryComponent} from "@/app/history/history.component";

export default function HistoryPage() {

    const [history, setHistory] = React.useState<Array<History>>([]);

    const fetchData = async () => {
        const historyTmp:History[] = await getHistoryApi();
        console.log( historyTmp );
        setHistory(historyTmp);
    }

    React.useEffect( () => {

        fetchData();

    }, []);

    return (
        !history ? <CircularProgress/> : <HistoryComponent history={history} />
    );
}