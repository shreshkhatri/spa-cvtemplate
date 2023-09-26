'use client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AppTheme from '@/assets/AppTheme';


export default function Home() {

  return (
    <AppTheme>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%'
        }}>
          <Typography textAlign='center'>Hi Welcome to my page</Typography>

        </Box>
    </AppTheme>
  )
}

