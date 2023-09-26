import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemProject from './listItems/ItemProject';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS,DROPPABLE_TYPES } from '@/data/data';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function ProjectsTimeline({ setOpenNewProjectForm, deleteProjects, projects, deleteProject, openFormForProjectEdit }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="projects-timeline-content"
                    id="projects-timeline-header"
                >
                    <Box id='projects' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <Typography variant="h6">
                            Projects
                        </Typography>


                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
                            <Tooltip title='Add New Project'>
                                <IconButton onClick={() => setOpenNewProjectForm(true)}>
                                    <LibraryAddOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete Projects'>
                                <IconButton onClick={deleteProjects}>
                                    <HighlightOffOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            {!expanded &&
                                <Tooltip title='expand project history'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse project history'>
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
                            projects.length != 0 &&
                            <Droppable droppableId={DROPPABLE_TYPE_IDS.projectTimeline} type={DROPPABLE_TYPES.Project}>
                                {
                                    (provided, snapshot) => (
                                        <Timeline
                                            ref={provided.innerRef}
                                            
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
                                            {...provided.droppableProps}
                                        >

                                            {
                                                projects.map((project, index) => {
                                                    return (
                                                        <Draggable draggableId={project.projectID} key={project.projectID} index={index}>
                                                            {
                                                                (provided, snapshot) => (
                                                                    <TimelineItem ref={provided.innerRef} key={project.projectID}  {...provided.draggableProps} {...provided.dragHandleProps}>

                                                                        <TimelineSeparator>
                                                                            <TimelineDot color='success' />
                                                                        </TimelineSeparator>
                                                                        <TimelineContent sx={{ paddingBottom: 3 }}>
                                                                            <ItemProject project={project} deleteProject={deleteProject} openFormForProjectEdit={openFormForProjectEdit} isDragging={snapshot.isDragging} />
                                                                        </TimelineContent>
                                                                    </TimelineItem>

                                                                )
                                                            }

                                                        </Draggable>
                                                    )

                                                })
                                            }
                                            {provided.placeholder}
                                        </Timeline>
                                    )
                                }
                            </Droppable>

                        }

                        {
                            projects.length == 0 && <Typography align='center'>No Projects added yet. <br></br> Start adding new qualification by clicking link above.</Typography>
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}