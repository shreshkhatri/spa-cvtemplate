import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'


export default function CareerSummary({ career_summary, deleteCareerSummary,setIsCareerSummaryEditMode }) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: 5
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row'
                },
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6">
                    <BsReverseLayoutTextSidebarReverse size={20} /> Career Summary
                </Typography>

                <Button size='small' variant="outlined" color='error' onClick={deleteCareerSummary}><AiOutlineDelete /> Delete this section</Button>



            </Box>
            <Typography sx={{ padding: 2 }} variant='subtitle2' ><p onDoubleClick={()=>setIsCareerSummaryEditMode(true)}>{career_summary}</p></Typography>
        </Box>

    );
}