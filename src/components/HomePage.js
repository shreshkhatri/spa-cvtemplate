'use client';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import _ from 'lodash';
import Copyright from './Copyright';


// TODO remove, this demo shouldn't need to reset the theme.

export default function Home() {
    document.title='Home - CV Building'

    return (
        <Box sx={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
            <Box
                sx={{
                    pt: 8,
                    pb: 6,
                    flexGrow:1,
                   
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h3"
                        variant="h3"
                        align="center"
                      
                        gutterBottom
                    >
                        Build CV with us
                    </Typography>
                    <Typography variant="h5" align="center" paragraph>
                        Welcome to theCV.org App, where you can effortlessly create, save, and download your professional CV in PDF format.<br></br><br></br> Sign up today and take the first step towards a brighter tomorrow. Your dream career awaits – lets make it happen together!
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Link href='/login' ><Button variant="contained">member login</Button></Link>
                        <Link href='/signup'><Button variant="outlined">Join today</Button></Link>
                    </Stack>
                </Container>
            </Box>
            <Copyright sx={{ mt: 5 }}/>
         
        </Box>
    );
}