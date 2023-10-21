"use client";

import {
    Button,
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
    createNewTemplate: (name: string,
                        categoryArr: Array<string>) => void
}
export const NewTemplateComponent: React.FC<Props> = ({categories, createNewTemplate}) => {
    const [name, setName] = React.useState<string>('');

    const [checked, setChecked] = React.useState<Array<string>>([]);

    const handleToggle = (categoryId: string) => () => {
        const currentIndex = checked.indexOf(categoryId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(categoryId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Template Name:</td>
                        <td>
                            <TextField label="Enter New Template Name" style={{width:'100%'}} value={name} onChange={(v) => setName(v.target.value) } />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{paddingTop: '20px'}}>

                                <legend>Select Categories For The Template:</legend>
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
                                                <ListItemButton role={undefined} onClick={handleToggle(category.id)} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(category.id) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                            onClick={()=>{

                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={category.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button variant="contained"
                                    disabled={name.length === 0 || checked.length === 0}
                                    onClick={()=>
                                        createNewTemplate(name, checked)
                                    }>
                                Create New Template
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}