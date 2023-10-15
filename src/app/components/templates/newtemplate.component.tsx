"use client";


import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField
} from "@mui/material";
import React from "react";
import CommentIcon from '@mui/icons-material/Comment';
import {Category} from "@prisma/client";

type Props = {
    categories: Array<Category>
}
export const NewtTemplateComponent: React.FC<Props> = ({categories}) => {
    const [name, setName] = React.useState<string>('');

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <>
        <div key='div1'>
            <TextField label="Template Name" style={{width:'100%'}} value={name} onChange={(v) => setName(v.target.value) } />
        </div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {categories.map((category: Category, idx:number) => {
                    const labelId = `checkbox-list-label-${category}`;

                    return (
                        <ListItem
                            key={category.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(idx)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(idx) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={category.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    )
}