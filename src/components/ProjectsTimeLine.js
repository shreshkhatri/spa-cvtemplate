import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import ItemProject from './listItems/ItemProject';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS } from '@/data/data';


export default function ProjectsTimeline({ projects, deleteProject, openFormForProjectEdit }) {


    return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minHeight: '20vh'
            }}>

                {
                    projects.length != 0 &&
                    <Droppable droppableId={DROPPABLE_TYPE_IDS.projectTimeline}>
                        {
                            (provided, snapshot) => (
                                <Timeline
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
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

    );
}