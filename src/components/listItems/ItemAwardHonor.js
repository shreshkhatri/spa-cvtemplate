import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';



export default function ItemAwardHonor({ award, deleteAward, openFormForAwardHonorEdit,isDragging }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {
                xs: 'column',
                sm: 'row'
            },
            alignItems: 'center',
            width: '100%',
            boxShadow:isMouseOver || isDragging ?1:0,
            borderRadius:isMouseOver || isDragging ?1:0,
            p: 1
        }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Box sx={{ flexGrow: 1 }} >
                <Typography
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    {award.award_date ? formatDate(award.award_date) : 'Date - N/A '}
                </Typography>

                {!_.isEmpty(award.name) ? <Typography display='inline' sx={{ fontWeight: 'bold' }}>{capitalizeWords(award.name)} </Typography> : null}
                <Typography display='inline' sx={{ fontWeight: 'bold' }}>, {capitalizeWords(award.awarding_body)} </Typography>

                {!_.isEmpty(award.description) && <Typography variant="body2" gutterBottom><i><b>Summary </b></i><br></br>
                    {award.description}
                </Typography>}


            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', visibility: isMouseOver ? 'visible' : 'hidden' }}>
                <Button variant='text' sx={{ fontWeight: '780', color: 'success.main', textDecoration: 'underline' }} size='small' onClick={() => openFormForAwardHonorEdit(award._id)}>Edit</Button>
                <Button variant='text' sx={{ fontWeight: '780', color: 'error.main', textDecoration: 'underline' }} size='small' onClick={() => deleteAward(award._id)}>Delete</Button>
            </Box>
        </Box>

    )
}