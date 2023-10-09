import Box from '@mui/material/Box';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import ItemJournal from './listItems/ItemJournal';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function JournalsList({ journals }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="journals-content"
                    id="journals-header"
                >
                    <Box id='journals' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <Typography variant="h6">
                            Journals
                        </Typography>
                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
                            
                            {!expanded &&
                                <Tooltip title='expand journals history'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse journals history'>
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
                            journals.length !== 0 &&
                            <Timeline
                                sx={{
                                    [`& .${timelineItemClasses.root}:before`]: {
                                        flex: 0,
                                        padding: 2,
                                    },
                                }}
                            >

                                {
                                    journals.map((journal) => {
                                        return <TimelineItem key={journal._id}>

                                            <TimelineSeparator>
                                                <TimelineDot color='success' />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ paddingBottom: 1 }}>
                                                <ItemJournal journal={journal}  />
                                            </TimelineContent>
                                        </TimelineItem>


                                    })
                                }
                            </Timeline>
                        }

                        {journals.length == 0 && <Typography align='center'>No journals added yet.</Typography>}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}