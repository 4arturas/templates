"use client";

import {
    Box,
    Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment,
    InputLabel,
    ListItemText, MenuItem, Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    ICategorySelectItem,
    ICategorySelect,
    ITemplateResponse,
    googleIconNames2,
} from "@/app/utils";
import {Search} from "@mui/icons-material";


type Props = {
    templateResponse: ITemplateResponse | undefined
    categorySelectArr: Array<ICategorySelect>
    categorySelectItemArr: Array<ICategorySelectItem>
    templateFunctionCreateNew: (name: string, subject: string, to: string, icon: string, templateText: string, valueIdArr: Array<{
        categoryId: string,
        valueId: string
    }>) => void
}


export const TemplateComponent: React.FC<Props> = ({
                                                       templateResponse,
                                                       categorySelectArr,
                                                       categorySelectItemArr,
                                                       templateFunctionCreateNew
                                                   }) => {
    const [name, setName] = React.useState<string>(templateResponse ? templateResponse.name : '');
    const [subject, setSubject] = React.useState<string>(templateResponse ? templateResponse.subject : '');
    const [to, setTo] = React.useState<string>(templateResponse ? templateResponse.to : '');
    const [iconSvg, setIconSvg] = React.useState<string>(templateResponse ? templateResponse.icon : '');
    const [templateText, setTemplateText] = React.useState<string>(templateResponse ? templateResponse.templateText : '');
    const [selectedElements, setSelectedElements] = React.useState<Array<ICategorySelect>>(categorySelectArr);


    const [open, setOpen] = React.useState<boolean>(false);
    const [searchPhrase, setSearchPhrase] = React.useState<string>('');


    const onSelectionChange = (event: SelectChangeEvent<Array<string>>, group: ICategorySelect) => {
        //const {target: { value },} = event;
        const value = event.target.value;

        selectedElements.map((item) => {
            if (item.categoryId === group.categoryId) {
                item.selectedValue = typeof value === "string" ? value.split(",") : value;
            }
        });

        setSelectedElements([...selectedElements]);
    };

    const handleClose = () => {
        setOpen(false)
        // onClose(selectedValue);
    };


    return (
        <Box sx={{width: '1000px'}}>

            <table style={{width: '100%'}} cellPadding={20}>
                <tbody>
                <tr>
                    <td>
                        <table cellPadding={20}>
                            <tbody>
                            <tr>
                                <td style={{width: '200px'}}>
                                    <InputLabel>
                                        Template Name:
                                    </InputLabel>
                                </td>
                                <td>
                                    <TextField label="Enter New Template Name" style={{width: '500px'}} value={name}
                                               onChange={(v) => setName(v.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InputLabel>
                                        Subject:
                                    </InputLabel></td>
                                <td>
                                    <TextField label="Enter Subject" style={{width: '500px'}} value={subject}
                                               onChange={(v) => setSubject(v.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InputLabel>
                                        To:
                                    </InputLabel></td>
                                <td>
                                    <TextField label="Enter To" style={{width: '500px'}} value={to}
                                               onChange={(v) => setTo(v.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InputLabel>
                                        Icon
                                    </InputLabel>
                                </td>
                                <td>
                                    <Button variant="contained" onClick={() => {
                                        setOpen(true)
                                    }}>Select Icon</Button>

                                    {iconSvg.length > 0 &&
                                        <i style={{width: '32px', height: '32px', marginLeft: '20px'}}
                                           className="material-icons">{iconSvg}</i>}
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </td>

                    <td valign={'top'}>
                        {/*https://codesandbox.io/s/mui-select-dynamically-created-mutiple-options-to-select-nivf9w?file=/src/App.js:1278-2405*/}

                        {selectedElements.map(function (group) {
                            return (
                                <FormControl key={`formControl${group.categoryId}`} variant="standard"
                                             sx={{m: 1, width: 300, mt: 3}}>
                                    <InputLabel id={`label${group.categoryId}`} key={`label${group.categoryId}`}>
                                        {group.name}
                                    </InputLabel>
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
                    </td>
                </tr>

                <tr>
                    <td colSpan={2}>
                        <InputLabel key={`labelTemplateText`}>
                            Template Text:
                        </InputLabel>
                        <ReactQuill key={`reactQuill`} theme="snow" value={templateText} onChange={setTemplateText}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Button variant="contained"
                                disabled={name.length === 0 || subject.length === 0 || to.length === 0 || templateText.length === 0 || selectedElements.length === 0}
                                onClick={() => {

                                    const selectedValueIdArr: Array<{
                                        categoryId: string,
                                        valueId: string
                                    }> = [];
                                    const selected = selectedElements.flatMap((category: ICategorySelect) => {
                                        return {categoryId: category.categoryId, selectedValue: category.selectedValue}
                                    })
                                    for (let i = 0; i < selected.length; i++) {
                                        const {categoryId, selectedValue} = selected[i];
                                        for (let j = 0; j < selectedValue.length; j++) {
                                            const selectedCategoryDataValue: string = selectedValue[j];
                                            const valueId: string | undefined = categorySelectItemArr.find(f => f.categoryId === categoryId && f.name === selectedCategoryDataValue)?.categoryValueId;
                                            if (!valueId)
                                                continue;
                                            selectedValueIdArr.push({
                                                categoryId: categoryId,
                                                valueId: valueId
                                            })
                                        } // end for j
                                    } // end for i
                                    templateFunctionCreateNew(name, subject, to, iconSvg, templateText, selectedValueIdArr);
                                }}>
                            {templateResponse ? 'Edit Template' : 'Create New Template'}
                        </Button>
                    </td>
                </tr>
                </tbody>
            </table>


            <Dialog sx={{height: '500px'}}
                    open={open} style={{position: 'absolute', top: 0}}
            >
                <DialogTitle>
                    Select icon
                    <TextField
                        label="Search for the Icon"
                        style={{width: '100%', marginBottom: '10px'}}
                        value={searchPhrase}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onChange={(v) => setSearchPhrase(v.target.value)}/>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/*googleIcons3187*/}
                        {googleIconNames2.map(((icon) => {
                            if (searchPhrase.length > 0 && !icon.includes(searchPhrase))
                                return <></>
                            return <Card key={`cardIcon${icon}`}
                                style={{width: '40px', display: 'inline', marginRight: '10px', cursor: 'pointer'}}
                                onClick={() => {
                                    setIconSvg(icon);
                                    setOpen(false);
                                }}>
                                <table  key={`tableIcon${icon}`} style={{display: "inline-table", marginBottom: '10px'}}>
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign: 'center'}}>
                                            <i style={{width: '32px', height: '32px'}}
                                               className="material-icons">{icon}</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{textTransform: 'capitalize'}}>
                                            {icon.replace(/_/g, " ")}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Card>
                        }))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}