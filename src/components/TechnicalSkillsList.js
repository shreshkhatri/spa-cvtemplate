import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ItemTechnicalSkill from './listItems/ItemTechnicalSkill';
import NewTechnicalSkillForm from '@/components/forms/FormsForNewEntry/NewTechnicalSkillForm';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


export default function TechnicalSkillsList({ addNewTechnicalSkill, openNewTechnicalSkillForm, deleteTechnicallSection, setOpenNewTechnicalSkillForm, technical_skills, deleteTechnicalSkill }) {
    
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
                    <Tooltip title='Add Technical Skill'>
                        <IconButton onClick={() => setOpenNewTechnicalSkillForm(true)}>
                            <LibraryAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete Technical Skill Section'>
                        <IconButton onClick={deleteTechnicallSection}>
                            <HighlightOffOutlinedIcon />
                        </IconButton>
                    </Tooltip>

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
            
            <NewTechnicalSkillForm open={openNewTechnicalSkillForm} setOpen={setOpenNewTechnicalSkillForm} addNewTechnicalSkill={addNewTechnicalSkill} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minHeight: '20vh'
            }}>

                {technical_skills.length == 0 && <Typography align='center'>No skills added yet. <br></br> Start adding new skills by clicking link above.</Typography>}

                {technical_skills.length !== 0 &&

                    <List dense>
                        {
                            technical_skills.map(skill => <ItemTechnicalSkill key={skill._id} skill={skill} deleteTechnicalSkill={deleteTechnicalSkill} />)
                        }

                    </List>
                }
            </Box>
            </AccordionDetails>
            </Accordion>
        </Box>


    );
}

