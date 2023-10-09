import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import _ from 'lodash';
import ItemDegree from './listItems/ItemDegree';
import { IconButton, Tooltip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function EducationTimeLine({ education_history}) {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="education-history-header-content"
                    id="education-history-header"
                >
                    <Box id='education_history' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }} >
                        <Typography variant="h6">
                            Education
                        </Typography>
                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>

                            {!expanded &&
                                <Tooltip title='expand education history'>
                                    <IconButton onClick={()=>setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse education history'>
                                    <IconButton onClick={()=>setExpanded(false)}>
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
                            education_history.length !== 0 &&

                            
                                        <Timeline 
                                            sx={{
                                                [`& .${timelineItemClasses.root}:before`]: {
                                                    flex: 0,
                                                    padding: 2,
                                                },
                                            }}
                                        >

                                            {
                                                education_history.map((degree, index) => {
                                                    
                                                                return (<TimelineItem  key={degree._id} >

                                                                    <TimelineSeparator>
                                                                        <TimelineDot color='success' />
                                                                        {(education_history.length - 1) !== index && <TimelineConnector />}
                                                                    </TimelineSeparator>
                                                                    <TimelineContent sx={{ paddingBottom: 1 }}>
                                                                        <ItemDegree degree={degree}/>
                                                                    </TimelineContent>
                                                                </TimelineItem>)
                                                            })
                                            }
                                        </Timeline>

                        }
                        {
                            education_history.length == 0 && <Typography align='center'>No Qualifications added yet.</Typography>
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}