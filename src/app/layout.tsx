"use client";

import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {
    AppBar, BottomNavigationAction,
    Box, Breadcrumbs,
    Chip,
    emphasize,
    Stack, styled,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {createTheme} from '@mui/material/styles';
import Link from "next/link";
import {lightBlue} from "@mui/material/colors";
import React from "react";
import Button from "@mui/material/Button";

import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePathname } from 'next/navigation'
import { HeaderComponent } from './header.component';

const inter = Inter({subsets: ['latin']})

const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}
let theme = createTheme({
    palette: {
        primary: {
            main: '#0052cc',
        },
        secondary: {
            main: '#000',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const pathname = usePathname()



    return (
        <html lang="en">
        <head>
            <title>Template management</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </head>
        <body>
        <ThemeProvider theme={theme}>
                <Box>
                    <HeaderComponent pathname={pathname} />
                    {/*<Stack style={{marginTop: '40px', marginLeft: '40px', marginRight: '40px'}}>*/}
                    <Stack gap={2} sx={{p: 1, marginTop: '40px'}} alignItems="center">
                        {children}
                    </Stack>
                    <AppBar position="static" style={{bottom: 0, position: 'fixed'}}>
                        <Typography>&nbsp;&nbsp;&copy;2023</Typography>
                    </AppBar>
                </Box>
        </ThemeProvider>
        </body>

        </html>
    )
}
