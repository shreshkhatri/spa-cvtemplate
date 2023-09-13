import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function CareerSummary({ career_summary, deleteCareerSummary, setIsCareerSummaryEditMode }) {
    const [isMouseOver,setIsMouseOver] = useState(false);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6">
                     Career Summary
                </Typography>
                <Tooltip sx={{visibility:isMouseOver?'visible':'hidden'}} title='Delete career summary'>
                    <IconButton onClick={deleteCareerSummary}>
                    <ClearOutlinedIcon  />
                    </IconButton>
                </Tooltip>

            </Box>
            <Typography sx={{ padding: 2 }} variant='subtitle2' ><p onDoubleClick={() => setIsCareerSummaryEditMode(true)}>{career_summary}</p></Typography>
        </Box>

    );
}