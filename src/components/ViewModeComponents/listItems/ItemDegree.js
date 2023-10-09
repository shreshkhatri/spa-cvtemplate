import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';
import _ from 'lodash';
import { Box, } from '@mui/material';


export default function ItemDegree({ degree }) {

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
            p:1
        }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    {degree.start_date ? formatDate(degree.start_date) : ' N/A '} - {degree.isContinue ? "continue" : degree.end_date ? formatDate(degree.end_date) : ' N/A '}
                </Typography>

                <Typography display='inline' sx={{ fontWeight: 'bold' }}>
                    {capitalizeWords(degree.degree)} , {capitalizeWords(degree.institution)} ,{capitalizeWords(degree.city)} , {degree.country?degree.country.label:null}
                </Typography>

                {!_.isEmpty(degree.grade) && <Typography variant="body2" display='inline' sx={{ fontWeight: 'bold', fontStyle: 'italic' }}> {capitalizeWords(degree.grade)}</Typography>}

                {!_.isEmpty(degree.course_summary) && <Typography variant="body2" sx={{ paddingTop: 1 }} gutterBottom> <em> <strong> Summary</strong> </em><br></br>{degree.course_summary}</Typography>}

            </Box>
        </Box>

    );
}