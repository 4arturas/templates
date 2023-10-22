"use client";

import {
    Box,
    Button,
    Checkbox,
    IconButton, InputLabel,
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
    categories: Array<Category>
    createNewTemplate: (name:string, subject: string, to: string, icon: string, templateText: string, categoryArr:Array<string>)=> void
}
export const NewTemplateComponent: React.FC<Props> = ({categories, createNewTemplate}) => {
    const [name, setName] = React.useState<string>('');
    const [subject, setSubject] = React.useState<string>('');
    const [to, setTo] = React.useState<string>('');
    const [iconSvg, setIconSvg] = React.useState<string>('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">REPLACE THIS TEXT WITH PATH</svg>');
    const [templateText, setTemplateText] = React.useState<string>('');

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
        <Box sx={{width: '1000px'}}>
            <table style={{width:'100%'}}>
                <tbody>
                    <tr>
                        <td style={{width: '200px'}}>
                            <InputLabel>
                                Template Name:
                            </InputLabel>
                        </td>
                        <td>
                            <TextField label="Enter New Template Name" style={{width:'500px'}} value={name} onChange={(v) => setName(v.target.value) } />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <InputLabel>
                                Subject:
                            </InputLabel></td>
                        <td>
                            <TextField label="Enter Subject" style={{width:'500px'}} value={subject} onChange={(v) => setSubject(v.target.value) } />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <InputLabel>
                                To:
                            </InputLabel></td>
                        <td>
                            <TextField label="Enter To" style={{width:'500px'}} value={to} onChange={(v) => setTo(v.target.value) } />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <InputLabel>
                                Icon(<a href='http://svgicons.sparkk.fr/' target='_blank'>svg</a>):
                            </InputLabel>
                        </td>
                        <td>
                            <TextField label="Enter Icon Address" style={{width:'500px'}} value={iconSvg} onChange={(v) => setIconSvg(v.target.value) } multiline={true}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{paddingTop: '20px'}}>
                                <legend>
                                    <InputLabel>
                                        Select Categories For The Template:
                                    </InputLabel>
                                </legend>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {categories.map((category: Category, idx:number) => {
                                        const labelId = `checkbox-list-label-${category}`;

                                        return (
                                            <ListItem
                                                key={category.id}
                                                /*secondaryAction={
                                                    <IconButton edge="end" aria-label="comments">
                                                        <CommentIcon />
                                                    </IconButton>
                                                }*/
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
                            <InputLabel>
                                Template Text:
                            </InputLabel>
                            <ReactQuill theme="snow" value={templateText} onChange={setTemplateText} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button variant="contained"
                                    disabled={name.length === 0 || subject.length === 0 || to.length === 0 || templateText.length === 0 || checked.length === 0}
                                    onClick={()=>
                                        createNewTemplate(name, subject, to, iconSvg, templateText, checked)
                                    }>
                                Create New Template
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Box>
    )
}