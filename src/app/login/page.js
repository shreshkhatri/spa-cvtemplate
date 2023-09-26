'use client';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThreeDots } from 'react-loading-icons'
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Link from 'next/link';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link href="https://theCV.org/">
                CV Org
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function LoginPage() {

    const [pageLoading, setpageLoading] = useState(true);
    const [useremail, setUseremail] = useState('')
    const [signinIn, setSigninIn] = useState(false)
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false);
    const [loginResponse, setLoginResponse] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setpageLoading(false)
    }, [])

    //function to login
    async function login() {

        return await fetch('/login', {
            method: "POST",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify({ useremail, password, rememberMe }),
            credentials: 'include'
        }).then(async (response) => {
            var json = await response.json()
            return { status: response.status, ...json }
        })
            .then(response => {

            })
            .catch(error => {
        
            });
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        setSigninIn(true)

        //returns boolean response
        const loginResponse = await login()
        if (!loginResponse) {
            setSigninIn(false)
            return
        }
        setIsLoggedIn(loginResponse)
        setSigninIn(false)

    };

        return (
            <Box>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={8}
                        md={8}
                        sx={{
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={4} md={4} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Member sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    size='small'
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={useremail}
                                    onChange={(e) => setUseremail(e.target.value)}
                                    autoFocus
                                    autoComplete="off"
                                />
                                <TextField
                                    size='small'
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" onChange={() => setRememberMe(!rememberMe)} />}
                                    label="Remember me"
                                />
                                {loginResponse &&
                                    <Alert severity={loginResponse.code}>
                                        {loginResponse.message}
                                    </Alert>
                                }
                                <Button
                                    size='small'
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {signinIn && <ThreeDots speed={.5} style={{ padding: '.60rem' }} />}
                                    {!signinIn && "Sign In"}
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href='/signup' style={{ textDecoration: 'none', color: 'inherit' }} >
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
}