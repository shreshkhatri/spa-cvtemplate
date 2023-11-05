"use client"
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { ThreeDots } from 'react-loading-icons'
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ENDPOINT } from '@/data/endpoints';
import Copyright from '@/components/Copyright';
import AppTheme from '@/assets/AppTheme';



export default function SignUp() {

  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notification, setNotification] = useState('');
  const [signingUp, setSighiningUp] = useState(false)



  useEffect(() => {
    document.title = 'SignUp - CV Building'
  })

  function confirmPasswordMatch() {
    setNotification('')
    if (password !== confirmPassword) {
      setNotification('Password did not match!')
      return false;
    }
    else {
      setNotification('')
      return true
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSighiningUp(true)
    if (!confirmPasswordMatch()) return;

    await fetch(ENDPOINT.SIGNUP, {
      method: "POST",
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
      },
      body: JSON.stringify({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        username: userName.trim(),
        email: email.trim(),
        password: password
      })
    }).then(async (response) => {
      var json = await response.json()
      return { status: response.status, ...json }
    })
      .then(response => {
        if (response.status == 200) {
          const { data } = response
          localStorage.setItem('auth-token', data.token);
          localStorage.setItem('user-data', JSON.stringify(data.user));
          setSighiningUp(false)
          router.push('/')
        }
        else {
          const { error } = response
          setSighiningUp(false)
          setNotification(JSON.stringify(error))
        }
      })
      .catch(error => {
        setSighiningUp(false)
        setNotification('Connection error occured, Please check your connection')
      });
  };

  return (
    <AppTheme>
      <Box sx={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <Container component="main" maxWidth="xs" sx={{flexGrow:1}}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='off'
                    name="firstName"
                    size="small"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete='off'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    size="small"
                    label="Email Address"
                    name="email"
                    autoComplete='off'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    size="small"
                    label="Username"
                    name="username"
                    autoComplete='off'
                    value={userName}
                    onChange={e => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    size="small"
                    autoComplete='off'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  {
                    password.length !== 0 && <PasswordStrengthBar password={password} style={{ width: '100%', paddingLeft: 50, paddingRight: 50 }} />
                  }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    size="small"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography textAlign={'center'} sx={{ visibility: !_.isEmpty(notification) ? 'visible' : 'hidden' }}>{` ${notification}`}</Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="small"
              >
                {signingUp && <ThreeDots speed={.5} style={{ padding: '.60rem' }} />}
                {!signingUp && "Sign Up"}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </Container>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AppTheme>
  );
}