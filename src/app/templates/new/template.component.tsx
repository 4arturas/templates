"use client";

import {
    Box,
    Button, FormControl,
    InputLabel,
    ListItemText, MenuItem, Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {ICategoryMenuItem, ICategorySelect, ITemplateResponse} from "@/app/utils";

type Props = {
    templateResponse: ITemplateResponse | undefined
    categoryOptions: Array<ICategorySelect>
    options: Array<ICategoryMenuItem>
    templateFunction: (name: string, subject: string, to: string, icon: string, templateText: string, categoryValueIdArr: Array<{
        categoryId: string,
        categoryValueId: string
    }>) => void
}


export const TemplateComponent: React.FC<Props> = ({templateResponse, categoryOptions, options, templateFunction}) => {
    const [name, setName] = React.useState<string>(templateResponse ? templateResponse.name : '');
    const [subject, setSubject] = React.useState<string>(templateResponse ? templateResponse.subject : '');
    const [to, setTo] = React.useState<string>(templateResponse ? templateResponse.to : '');
    const [iconSvg, setIconSvg] = React.useState<string>(templateResponse ? templateResponse.icon : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">REPLACE_THIS_TEXT_WITH_PATH</svg>');
    const [templateText, setTemplateText] = React.useState<string>(templateResponse ? templateResponse.templateText : '');
    const [selectedElements, setSelectedElements] = React.useState<Array<ICategorySelect>>(categoryOptions);

    const onSelectionChange = (event: SelectChangeEvent<Array<string>>, group: ICategorySelect) => {
        //const {target: { value },} = event;
        const value = event.target.value;

        selectedElements.map((item) => {
            if (item.categoryId === group.categoryId) {
                item.selectedValue = typeof value === "string" ? value.split(",") : value;
            }
        });

        setSelectedElements([...selectedElements]);
        console.log(selectedElements);
    };

    return (
        <Box sx={{width: '1000px'}}>
            <table style={{width: '100%'}}>
                <tbody>
                <tr>
                    <td>
                        <table>
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
                                        Icon(<a href='http://svgicons.sparkk.fr/' target='_blank'>svg</a>):
                                    </InputLabel>
                                </td>
                                <td>
                                    <TextField label="Enter Icon Address" style={{width: '500px'}} value={iconSvg}
                                               onChange={(v) => setIconSvg(v.target.value)} multiline={true}/>
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
                                        {options.map(function (option) {
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
                        <InputLabel>
                            Template Text:
                        </InputLabel>
                        <ReactQuill theme="snow" value={templateText} onChange={setTemplateText}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Button variant="contained"
                                disabled={name.length === 0 || subject.length === 0 || to.length === 0 || templateText.length === 0 || selectedElements.length === 0}
                                onClick={() => {

                                    const selectedCategoryValueIdArr: Array<{
                                        categoryId: string,
                                        categoryValueId: string
                                    }> = [];
                                    const selected = selectedElements.flatMap((category: ICategorySelect) => {
                                        return {categoryId: category.categoryId, selectedValue: category.selectedValue}
                                    })
                                    for (let i = 0; i < selected.length; i++) {
                                        const {categoryId, selectedValue} = selected[i];
                                        for (let j = 0; j < selectedValue.length; j++) {
                                            const selectedCategoryDataValue: string = selectedValue[j];
                                            const categoryValueId: string | undefined = options.find(f => f.categoryId === categoryId && f.name === selectedCategoryDataValue)?.categoryValueId;
                                            if (!categoryValueId)
                                                continue;
                                            selectedCategoryValueIdArr.push({
                                                categoryId: categoryId,
                                                categoryValueId: categoryValueId
                                            })
                                        } // end for j
                                    } // end for i
                                    templateFunction(name, subject, to, iconSvg, templateText, selectedCategoryValueIdArr);
                                }}>
                            {templateResponse ? 'Edit Template' : 'Create New Template'}
                        </Button>
                    </td>
                </tr>
                </tbody>
            </table>
        </Box>
    )
}