import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';


export default function ItemCouncil({ council, deleteCouncil, openFormForCouncilEdit ,isDragging}) {
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
                    {council.start_date ? formatDate(council.start_date) : ' N/A '} - {council.isContinue ? "continue" : council.end_date ? formatDate(council.end_date) : ' N/A '}
                </Typography>

                {!_.isEmpty(council.designation) ? <Typography display='inline' sx={{ fontWeight: 'bold' }}>{capitalizeWords(council.designation)} ,</Typography> : null}
                <Typography display='inline' sx={{ fontWeight: 'bold' }}> {capitalizeWords(council.name)} </Typography>
                {!_.isEmpty(council.city) ? <Typography display='inline' sx={{ fontWeight: 'bold' }}>, {capitalizeWords(council.city)} </Typography> : null}
                {!_.isNull(council.country) ? <Typography display='inline' sx={{ fontWeight: 'bold' }}>, {capitalizeWords(council.country.label)} </Typography> : null}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', visibility: isMouseOver ? 'visible' : 'hidden' }}>
                <Button variant='text' sx={{ fontWeight: '780', color: 'success.main', textDecoration: 'underline' }} size='small' onClick={() => openFormForCouncilEdit(council.councilID)}>Edit</Button>
                <Button variant='text' sx={{ fontWeight: '780', color: 'error.main', textDecoration: 'underline' }} size='small' onClick={() => deleteCouncil(council.councilID)}>Delete</Button>
            </Box>
        </Box>

    )
}