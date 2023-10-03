import Box from '@mui/material/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';

export default function ItemCommittee({ committee, deleteCommittee, openFormForCommitteeEdit, isDragging}) {
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
                    {committee.start_date ? formatDate(committee.start_date) : ' N/A '} - {committee.isContinue ? "continue" : committee.end_date ? formatDate(committee.end_date) : ' N/A '}
                </Typography>

                <Typography display='inline' sx={{ fontWeight: 'bold' }}>
                    {capitalizeWords(committee.designation)} , {capitalizeWords(committee.name)}
                    {!_.isEmpty(committee.city) ? ' ,' + capitalizeWords(committee.city) : null}
                    {!_.isNull(committee.country) ? ' ,' + committee.country.label : null}
                </Typography>

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', visibility: isMouseOver ? 'visible' : 'hidden' }}>
                <Button variant='text' sx={{ fontWeight: '780', color: 'success.main', textDecoration: 'underline' }} size='small' onClick={() => openFormForCommitteeEdit(committee._id)}>Edit</Button>
                <Button variant='text' sx={{ fontWeight: '780', color: 'error.main', textDecoration: 'underline' }} size='small' onClick={() => deleteCommittee(committee._id)}>Delete</Button>
            </Box>
        </Box>
    )
}