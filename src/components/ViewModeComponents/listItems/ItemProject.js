import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';
import { useState } from 'react';

export default function ItemProject({ project }) {
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
            <Box sx={{ flexGrow: 1, flexWrap:'wrap' }}>
                <Typography
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    {project.start_date ? formatDate(project.start_date) : ' N/A '} - {project.isContinue ? "continue" : project.end_date ? formatDate(project.end_date) : ' N/A '}
                </Typography>

                <Typography display='inline' sx={{ fontWeight: 'bold' }}>
                    {capitalizeWords(project.project_title)} , {capitalizeWords(project.designation)} ,{capitalizeWords(project.city)} {project.country?`, ${project.country.label}`:null}
                </Typography>
                {!_.isEmpty(project.description) && <Typography variant="body2" sx={{ paddingTop: 1 }} gutterBottom> <i> <b>Project Description</b> </i><br></br> {project.description}</Typography>}

            </Box>

        </Box>
    )
}