"use client";

import React from "react";
import {AppBar, Box, Breadcrumbs, Chip, InputLabel, Stack, Toolbar, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Value} from "@prisma/client";
import Link from "next/link";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

type Props = {
    pathname:string
}
export const HeaderComponent: React.FC<Props> = ({pathname}) => {
    const getColor = (p:string) => {
        return pathname===p ? 'primary': 'info';
    }
    return <>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Template management
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Stack gap={2} sx={{p: 1}} alignItems="center">
            <Breadcrumbs aria-label="breadcrumb">
                <Link href='/'>
                    <Chip label="Home" variant={pathname==='/' ? 'filled':'outlined'} color={pathname==='/' ? 'primary':'secondary'} icon={<HomeIcon fontSize="small" />} />
                </Link>
                <Link href='/templates'>
                    <Chip label="Templates"
                          variant={!pathname.includes('/templates/new') && pathname.includes('/templates') ? 'filled':'outlined'}
                          color={!pathname.includes('/templates/new') && pathname.includes('/templates') ? 'primary':'secondary'} />
                </Link>

                <Link href='/templates/new'>
                    <Chip label="Add Template" variant={pathname==='/templates/new' ? 'filled':'outlined'} color={pathname==='/templates/new' ? 'primary':'secondary'} />
                </Link>
                <Link href='/categories'>
                    <Chip label="Categories"
                          variant={!pathname.includes('/categories/new') && pathname.includes('/categories') ? 'filled':'outlined'}
                          color={!pathname.includes('/categories/new') && pathname.includes('/categories') ? 'primary':'secondary'} />
                </Link>
                <Link href='/categories/new'>
                    <Chip label="Add Category" variant={pathname==='/categories/new' ? 'filled':'outlined'} color={pathname==='/categories/new' ? 'primary':'secondary'} />
                </Link>
                <Link href='/history'>
                    <Chip label="History" variant={pathname==='/history' ? 'filled':'outlined'} color={pathname==='/history' ? 'primary':'secondary'} />
                </Link>
            </Breadcrumbs>
        </Stack>
    </>
}
