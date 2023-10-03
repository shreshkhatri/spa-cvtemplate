import { useState, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Toast({ show, severity, message ,setToastPayLoad}) {
    const [open, setOpen] = useState(show);

    
    const handleClose = (event, reason) => {
        setToastPayLoad({ show:false, severity:'success', message:''});
        if (reason === 'clickaway') {
            return;
        }
        
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical:'top',horizontal:'center' }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}