import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function ItemProject({ project, deleteProject, openFormForProjectEdit }) {
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
            boxShadow: isMouseOver ? 1 : 0,
            borderRadius: isMouseOver ? 1 : 0,
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
                    {capitalizeWords(project.project_title)} , {capitalizeWords(project.designation)} ,{capitalizeWords(project.city)} , {project.country.label}
                </Typography>
                {!_.isEmpty(project.description) && <Typography variant="body2" sx={{ paddingTop: 1 }} gutterBottom> <i> <b>Project Description</b> </i><br></br> {project.description}</Typography>}

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', visibility: isMouseOver ? 'visible' : 'hidden' }}>
                <Button variant='text' sx={{ fontWeight: '780', color: 'success.main', textDecoration: 'underline' }} size='small' onClick={() => openFormForProjectEdit(project.projectID)}>Edit</Button>
                <Button variant='text' sx={{ fontWeight: '780', color: 'error.main', textDecoration: 'underline' }} size='small' onClick={() => deleteProject(project.projectID)}>Delete</Button>
            </Box>

        </Box>
    )
}