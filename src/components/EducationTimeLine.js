import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash';
import ItemDegree from './listItems/ItemDegree';
import { DROPPABLE_TYPE_IDS ,DROPPABLE_TYPES} from '@/data/data';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function EducationTimeLine({ education_history, deleteEducationDegree, openFormForDegreeEdit, setOpenNewEducationForm, deleteEducationHistory }) {

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
                            <Tooltip title='Add education degree'>
                                <IconButton onClick={() => setOpenNewEducationForm(true)}>
                                    <LibraryAddOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='delete education history'>
                                <IconButton onClick={deleteEducationHistory}>
                                    <HighlightOffOutlinedIcon />
                                </IconButton>
                            </Tooltip>

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

                            <Droppable droppableId={DROPPABLE_TYPE_IDS.educationTimeline} type={DROPPABLE_TYPES.Education}>
                                {
                                    (provided, snapshot) => (
                                        <Timeline ref={provided.innerRef} {...provided.droppableProps}
                                            sx={{
                                                [`& .${timelineItemClasses.root}:before`]: {
                                                    flex: 0,
                                                    padding: 2,
                                                },
                                                border: snapshot.isDraggingOver ? 1 : 0,
                                                borderColor: snapshot.isDraggingOver ? '#f9f6ee' : null,
                                                boxShadow: snapshot.isDraggingOver ? 1 : 0,
                                                borderRadius: snapshot.isDraggingOver ? 2 : 0,

                                            }}
                                        >

                                            {
                                                education_history.map((degree, index) => {
                                                    return (
                                                        <Draggable draggableId={degree._id} key={degree._id} index={index} >
                                                            {(provided, snapshot) => {
                                                                return (<TimelineItem ref={provided.innerRef} key={degree._id} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                                    <TimelineSeparator>
                                                                        <TimelineDot color='success' />
                                                                        {(education_history.length - 1) !== index && <TimelineConnector />}
                                                                    </TimelineSeparator>
                                                                    <TimelineContent sx={{ paddingBottom: 1 }}>
                                                                        <ItemDegree degree={degree} deleteEducationDegree={deleteEducationDegree} openFormForDegreeEdit={openFormForDegreeEdit} isDragging={snapshot.isDragging} />
                                                                    </TimelineContent>
                                                                </TimelineItem>)
                                                            }
                                                            }
                                                        </Draggable>
                                                    )
                                                }

                                                )}
                                            {provided.placeholder}
                                        </Timeline>
                                    )
                                }

                            </Droppable>

                        }
                        {
                            education_history.length == 0 && <Typography align='center'>No Qualifications added yet. <br></br> Start adding new qualification by clicking link above.</Typography>
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}