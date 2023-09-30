import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ReactLoading from 'react-loading';


export default function LoadingUI() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', height: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ReactLoading type='spokes' color='#000000' />
            </Box>
            <Typography textAlign='center' sx={{ padding: 3 }}>Please wait ...</Typography>
        </Box>
    );
}

