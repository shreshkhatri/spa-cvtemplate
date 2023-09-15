import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import ItemTechnicalSkill from './listItems/ItemTechnicalSkill';


export default function TechnicalSkillsList({ technical_skills, deleteTechnicalSkill }) {

    const [isMouseOver, setIsMouseOver] = useState(false);
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight:'20vh'
        }}>

            {technical_skills.length == 0 && <Typography align='center'>No skills added yet. <br></br> Start adding new skills by clicking link above.</Typography>}

            {technical_skills.length !== 0 &&

                <List dense='true' >
                    {
                        technical_skills.map(skill => <ItemTechnicalSkill key={skill.skillID} skill={skill} deleteTechnicalSkill={deleteTechnicalSkill}/>)
                    }

                </List>
            }
        </Box>


    );
}

