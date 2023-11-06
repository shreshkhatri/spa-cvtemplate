import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{padding:2,backgroundColor:'#fff'}}>
            {'Copyright © '}
            <Link href="https://theCV.org/">
                CV Org
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

