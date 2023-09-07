import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'
import TextField from '@mui/material/TextField';

export default function CareerSummaryForm({ career_summary, updateCareerSummary, setIsCareerSummaryEditMode }) {

    const [careerSummary, setCareerSummary] = useState(career_summary);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateCareerSummary(careerSummary)
        setIsCareerSummaryEditMode(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: 5
        }} component={'form'}>

            <Typography variant="h6">
                Career Summary
            </Typography>
            <TextField
                autoComplete="off"
                name="inputCareerSummary"
                required
                fullWidth
                id="inputCareerSummary"
                label="Career Summary"
                size='small'
                value={careerSummary}
                autoFocus
                multiline
                maxRows={6}
                onChange={e => setCareerSummary(e.target.value)}
                
            />

            <Box sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                padding:1
            }}>
                <Button
                    size='small'
                    variant="outlined"
                    color='inherit'
                    onClick={() => setIsCareerSummaryEditMode(false)}
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    size='small'
                    color='success'
                    variant='outlined'
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Box>
        </Box>

    );
}