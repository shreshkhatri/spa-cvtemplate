import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';



export default function ItemAwardHonor({ award }) {
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
            boxShadow:isMouseOver   ?1:0,
            borderRadius:isMouseOver   ?1:0,
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
        </Box>

    )
}