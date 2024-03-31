"use client";

import React from "react";
import {CircularProgress} from "@mui/material";
import {HistoryComponent} from "@/app/history/history.component";
import {getHistoryApi} from "@/app/utils";

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