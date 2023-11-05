'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { ENDPOINT } from '@/data/endpoints';
import _ from 'lodash'
import Copyright from '@/components/Copyright';
import AppTheme from '@/assets/AppTheme';



export default function LoginPage() {

    const [useremail, setUseremail] = useState('')
    const [signinIn, setSigninIn] = useState(false)
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false);
    const [loginResponse, setLoginResponse] = useState('');
    const router = useRouter();

    useEffect(() => {
        document.title = 'LogIn - CV Building'
    })

    //function to login
    async function login() {

        return await fetch(ENDPOINT.LOGIN, {
            method: "POST",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify({
                email: useremail.trim(),
                password,
            }),
        }).then(async (response) => {
            var json = await response.json()
            return { status: response.status, ...json }
        })
            .then(response => {
                if (response.status == 200) {
                    const { data } = response
                    localStorage.setItem('auth-token', data.token);
                    localStorage.setItem('user-data', JSON.stringify(data.user));
                    setSigninIn(false)
                    router.push('/')
                }
                else {
                    const { error } = response
                    setSigninIn(false)
                    setLoginResponse(JSON.stringify(error))
                }

            })
            .catch(error => {
                setSigninIn(false)
                setLoginResponse('Connection Error, Please check your connection')
            });
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        setSigninIn(true)
        await login()

    };

    return (
        <AppTheme>
            <Box sx={{ minHeight: '100vh' ,display:'flex',flexDirection:'column', justifyContent:'space-between'}} >
                <Grid container component="main" sx={{flexGrow:1}}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={8}
                        md={8}
                        sx={{
                            backgroundRepeat: 'no-repeat',
                           
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={4} md={4}>
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
                                    autoComplete='username'
                                    id="email"
                                    label="Email / Username"
                                    name="email"
                                    value={useremail}
                                    onChange={(e) => setUseremail(e.target.value)}
                                    autoFocus
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
                                    autoComplete='current-password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" onChange={() => setRememberMe(!rememberMe)} />}
                                    label="Remember me"
                                />
                                {!_.isEmpty(loginResponse) &&
                                    <Alert severity='error'>
                                        {loginResponse}
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
                             
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Box>
        </AppTheme>
    );
}