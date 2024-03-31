"use client";

import React from "react";
import {
    Divider,
    InputLabel, List, ListItem, ListItemText,
} from "@mui/material";
import {Category, Value} from "@prisma/client";

type Props = {
    category: Category
    values: Array<Value>,
}
export const CategoryViewComponent: React.FC<Props> = ({category, values}) =>
    <React.Fragment>
        <InputLabel>
            {category.name}
        </InputLabel>
        {values.map((val, index) => (
            <List key={`List${index}`} component="nav">
                <ListItem key={`ListItem${index}`}>
                    <ListItemText key={`ListItemText${index}`} primary={val.name}/>
                </ListItem>
                <Divider/>
            </List>
        ))}
    </React.Fragment>

