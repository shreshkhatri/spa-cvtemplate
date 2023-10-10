import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemEditorial from './listItems/ItemEditorial';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


export default function EditorialExperienceTimeLine({ editorial_experience }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="editoial-experience-timeline-content"
                    id="editoial-experience-timeline-content"
                >
                    <Box id='editorial_experience' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <Typography variant="h6">
                            Editorial Board and Organized Special Issue
                        </Typography>
                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
                            {!expanded &&
                                <Tooltip title='expand Editoial Experience'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse Editoial Experience'>
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
                        {
                            editorial_experience.length != 0 &&

                            <Timeline
                                
                                sx={{
                                    [`& .${timelineItemClasses.root}:before`]: {
                                        flex: 0,
                                        padding: 2,
                                    }
                                }}
                            >
                                {
                                    editorial_experience.map((experience, index) => {
                                        return (<TimelineItem key={experience._id}>

                                            <TimelineSeparator>
                                                <TimelineDot color='success' />

                                            </TimelineSeparator>
                                            <TimelineContent sx={{ paddingBottom: 3 }}>
                                                <ItemEditorial experience={experience} />
                                            </TimelineContent>
                                        </TimelineItem>)
                                    })
                                }
                            </Timeline>

                        }
                        {
                            editorial_experience.length == 0 && <Typography align='center'>No Records are added yet.</Typography>
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}