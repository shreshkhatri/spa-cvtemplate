'use client';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import _ from 'lodash'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link href="https://theCV.org/">
                CV Org
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}


// TODO remove, this demo shouldn't need to reset the theme.

export default function Home() {

    return (
        <Box>
            <Box
                sx={{
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h3"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Build CV with us
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
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
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Copyright />
            </Box>
        </Box>
    );
}