import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot'
import ItemConference from './listItems/ItemConference';
import { IconButton, Tooltip } from '@mui/material';

import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function ConferencesList({ conferences }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="conferences-content"
                    id="conferences-header"
                >
                    <Box id='conferences' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <Typography variant="h6">
                            Conferences
                        </Typography>
                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
                        
                            {!expanded &&
                                <Tooltip title='expand conference history'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse conference history'>
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
                        {conferences.length == 0 && <Typography align='center'>No conferences added yet. <br></br> Start adding new conferences by clicking Add button above.</Typography>}
                        {conferences.length != 0 &&


                            <Timeline
                                sx={{
                                    [`& .${timelineItemClasses.root}:before`]: {
                                        flex: 0,
                                        padding: 2,
                                    },
                                }}
                            >
                                {
                                    conferences.map((conference, index) => {
                                        return <TimelineItem key={conference._id} >

                                            <TimelineSeparator>
                                                <TimelineDot color='success' />

                                            </TimelineSeparator>
                                            <TimelineContent sx={{ paddingBottom: 3 }}>
                                                <ItemConference conference={conference} />
                                            </TimelineContent>
                                        </TimelineItem>
                                    })
                                }
                            </Timeline>
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

