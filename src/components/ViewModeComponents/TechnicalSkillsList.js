import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ItemTechnicalSkill from './listItems/ItemTechnicalSkill';
import { IconButton, Tooltip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


export default function TechnicalSkillsList({ technical_skills }) {
    
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="technical-skills-content"
                    id="technical-skills-header"
                >
            <Box id='technical_skills' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <Typography variant="h6">
                    Technical Skills
                </Typography>
                <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>

                    {!expanded &&
                                <Tooltip title='expand technical skills list'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse technical skills list'>
                                    <IconButton onClick={() => setExpanded(false)}>
                                        <KeyboardDoubleArrowUpIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                </Box>
            </Box>
            </AccordionSummary>

            <AccordionDetails>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minHeight: '20vh'
            }}>

                {technical_skills.length == 0 && <Typography align='center'>No skills added yet.</Typography>}

                {technical_skills.length !== 0 &&

                    <List dense>
                        {
                            technical_skills.map(skill => <ItemTechnicalSkill key={skill._id} skill={skill} />)
                        }

                    </List>
                }
            </Box>
            </AccordionDetails>
            </Accordion>
        </Box>


    );
}

