import Box from '@mui/material/Box';
import { useSearchParams } from 'next/navigation';

export default function Error(){

    const searchParams = useSearchParams()
    const errorMessage = searchParams.get('errorMessage')

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%',justifyContent:'center',height:'100vh',paddingLeft:'45%' }}>
            {errorMessage}
        </Box>
    );
}

