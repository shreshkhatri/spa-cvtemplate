import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';


export default function ItemAccreditation({ accreditation, deleteAccreditation, openFormForAccreditationExperienceEdit, isDragging }) {
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
                    {accreditation.start_date ? formatDate(accreditation.start_date) : ' N/A '} - {accreditation.isContinue ? "continue" : accreditation.end_date ? formatDate(accreditation.end_date) : ' N/A '}
                </Typography>

                <Typography display='inline' sx={{ fontWeight: 'bold' }}>
                    {capitalizeWords(accreditation.role)} , {capitalizeWords(accreditation.organization)}
                    {!_.isEmpty(accreditation.city) ? ' ,' + capitalizeWords(accreditation.city) : null}
                    {!_.isNull(accreditation.country) ? ' ,' + accreditation.country.label : null}

                </Typography>

                {!_.isEmpty(accreditation.description) && <Typography variant="body2" sx={{ paddingTop: 1 }} gutterBottom> <em> <strong> Summary</strong> </em><br></br>{accreditation.description}</Typography>}

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', visibility: isMouseOver ? 'visible' : 'hidden' }}>
                <Button variant='text' sx={{ fontWeight: '780', color: 'success.main', textDecoration: 'underline' }} size='small' onClick={() => openFormForAccreditationExperienceEdit(accreditation._id)}>Edit</Button>
                <Button variant='text' sx={{ fontWeight: '780', color: 'error.main', textDecoration: 'underline' }} size='small' onClick={() => deleteAccreditation(accreditation._id)}>Delete</Button>
            </Box>
        </Box>

    )
}