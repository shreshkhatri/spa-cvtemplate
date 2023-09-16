import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';

export default function ItemEditorial({ experience, deleteEditorialExperience, openFormForEditorialExperienceEdit, isDragging }) {
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
                    {experience.start_date ? formatDate(experience.start_date) : ' N/A '} - {experience.isContinue ? "continue" : experience.end_date ? formatDate(experience.end_date) : ' N/A '}
                </Typography>

                <Typography display='inline' sx={{ fontWeight: 'bold' }}>
                    {capitalizeWords(experience.role)} , {capitalizeWords(experience.association)}
                    {!_.isEmpty(experience.city) ? ' ,' + capitalizeWords(experience.city) : null}
                    {!_.isNull(experience.country) ? ' ,' + experience.country.label : null}

                </Typography>

                {!_.isEmpty(experience.description) && <Typography variant="body2" sx={{ paddingTop: 1 }} gutterBottom> <em> <strong> Summary</strong> </em><br></br>{experience.description}</Typography>}

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', visibility: isMouseOver ? 'visible' : 'hidden' }}>
                <Button variant='text' sx={{ fontWeight: '780', color: 'success.main', textDecoration: 'underline' }} size='small' onClick={() => openFormForEditorialExperienceEdit(experience.experienceID)}>Edit</Button>
                <Button variant='text' sx={{ fontWeight: '780', color: 'error.main', textDecoration: 'underline' }} size='small' onClick={() => deleteEditorialExperience(experience.experienceID)}>Delete</Button>
            </Box>
        </Box>

    )
}