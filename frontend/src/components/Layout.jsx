import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Paper,
    Grid,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';

const APP_BAR_HEIGHT = 64;

const MainContent = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: APP_BAR_HEIGHT,
    minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    backgroundColor: theme.palette.background.default,
}));

export default function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <PolicyIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        수사 질답 기반 위험요소 자동 분류 시스템
                    </Typography>
                </Toolbar>
            </AppBar>
            <MainContent>
                <Container maxWidth="lg">
                    {children}
                </Container>
            </MainContent>
        </Box>
    );
}
