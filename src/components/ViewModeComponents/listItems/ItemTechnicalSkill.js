import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {  ListItemIcon } from '@mui/material';
import { TbPointFilled } from 'react-icons/tb'


export default function ItemTechnicalSkill({ skill  }) {

    const [isMouseOver, setIsMouseOver] = useState(false);

    return (<ListItem
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

