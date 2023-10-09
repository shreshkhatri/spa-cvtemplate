import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemAwardHonor from './listItems/ItemAwardHonor';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function AwardHonorsTimeLine({ awards_honors }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="awards-content"
                    id="awards-header"
                >
                    <Box id='awards_honors' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <Typography variant="h6">
                            Honors / Awards
                        </Typography>
                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>

                            {!expanded &&
                                <Tooltip title='expand awards history'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse awards history'>
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
                            awards_honors.length !== 0 &&
                            <Timeline

                                sx={{
                                    [`& .${timelineItemClasses.root}:before`]: {
                                        flex: 0,
                                        padding: 2,
                                    },
                                }}
                            >

                                {
                                    awards_honors.map((award, index) => {
                                        return (

                                            <TimelineItem key={award._id}>

                                                <TimelineSeparator>
                                                    <TimelineDot color='success' />
                                                    {(awards_honors.length - 1) !== index && <TimelineConnector />}
                                                </TimelineSeparator>
                                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                                    <ItemAwardHonor award={award} />
                                                </TimelineContent>
                                            </TimelineItem>
                                        )

                                    })
                                }
                            </Timeline>
                        }
                        {
                            awards_honors.length == 0 && <Typography align='center'>No awards / honors added.</Typography>
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}