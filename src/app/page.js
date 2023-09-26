'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link'

import AppTheme from '@/assets/AppTheme';

export default function Home() {


  return (
    <AppTheme>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }}>
        <Link href="/my-cv" style={{textDecoration:'underline'}}>Click here to build your CV</Link>

      </Box>
    </AppTheme>
  )
}

