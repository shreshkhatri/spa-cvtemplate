import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsPen } from 'react-icons/bs';

export default function PersonalStatement({ personal_statement, deletePersonalStatement,setIsPersonalStatementEditModeOn }) {
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
                    <BsPen size={20} /> Personal Statement
                </Typography>
                <Button size='small' variant="outlined" color='error' onClick={deletePersonalStatement}><AiOutlineDelete />Delete this section</Button>
            </Box>
            <Typography sx={{ padding: 2 }} variant='subtitle2'><q onDoubleClick={()=>setIsPersonalStatementEditModeOn(true)}> {personal_statement} </q></Typography>
        </Box>

    );
}