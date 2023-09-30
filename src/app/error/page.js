import { Typography } from '@mui/material';
import Box from '@mui/material/Box';


export default function Error() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', height: '100vh' }}>
            <Typography textAlign='center' sx={{ padding: 3 }}>Something went wrong. Please try again later.</Typography>
        </Box>
    );
}

