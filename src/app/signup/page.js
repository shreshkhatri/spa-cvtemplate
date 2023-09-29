"use client"
import { useState } from 'react';
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
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ENDPOINT } from '@/data/endpoints';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link href="https://theCV.org">
        CV Org
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {

  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notification, setNotification] = useState('')

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
        first_name:firstName,
        last_name:lastName,
        username:userName,
        email:email,
        password:password
    }),
      credentials: 'include'
    }).then(async (response) => {
        var json = await response.json()
        return { status: response.status, ...json }
    })
      .then(response => {
        if (response.status==200){
          router.push('/')
        }
        else{
          const {error} = response
          setNotification(JSON.stringify(error))
        }
        
      })
      .catch(error => {
        setNotification('Connection error occured, Please check your connection')
      });
  };

  return (
    <Box>
      <Container component="main" maxWidth="xs">
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
            Sign up
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
                  password.length !== 0 && <PasswordStrengthBar password={password} style={{ width: '100%' ,paddingLeft:50,paddingRight:50}} />
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
                  autoComplete='off'
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
              Sign Up
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}