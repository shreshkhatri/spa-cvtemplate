import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemCouncil from './listItems/ItemCouncil';
import { DROPPABLE_TYPE_IDS } from '@/data/data';
import { Draggable, Droppable } from 'react-beautiful-dnd'


export default function CouncilTimeLine({ councils, deleteCouncil, openFormForCouncilEdit }) {


    return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minHeight: '20vh'
            }}>
                {
                    councils.length !== 0 &&
                    <Droppable droppableId={DROPPABLE_TYPE_IDS.counciltimeline}>
                        {(provided, snapshot) => (
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
                                    councils.map((council,index) => {
                                        return <Draggable draggableId={council.councilID} key={council.councilID} index={index}>
                                            {(provided, snapshot) => (
                                                <TimelineItem ref={provided.innerRef} key={council.councilID} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                    <TimelineSeparator>
                                                        <TimelineDot color='success' />
                                                    </TimelineSeparator>
                                                    <TimelineContent sx={{ paddingBottom: 3 }}>
                                                        <ItemCouncil council={council} deleteCouncil={deleteCouncil} openFormForCouncilEdit={openFormForCouncilEdit} isDragging={snapshot.isDragging}/>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            )}
                                        </Draggable>
                                    })
                                }
                                {provided.placeholder}
                            </Timeline>)
                        }
                    </Droppable>
                }
                {
                    councils.length == 0 && <Typography align='center'>No Councils added yet. <br></br> Start adding new by clicking add button above.</Typography>
                }
            </Box>
    );
}