import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, ListItemIcon, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { TbPointFilled } from 'react-icons/tb'


export default function ItemTechnicalSkill({ skill, deleteTechnicalSkill }) {

    const [isMouseOver, setIsMouseOver] = useState(false);

    return (<ListItem
        secondaryAction={
            <IconButton sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }} edge="end" aria-label="delete" onClick={() => deleteTechnicalSkill(skill.skillID)}>
                <ClearIcon />
            </IconButton>
        }
        sx={{
            boxShadow: isMouseOver ? 1 : 0,
            borderRadius: isMouseOver ? 2 : 0
        }}
        onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}
    >
        <ListItemIcon >
            <TbPointFilled />
        </ListItemIcon>
        <ListItemText
            primary={skill.skill}
            secondary=''
        >
        </ListItemText>
    </ListItem>

    );
}

