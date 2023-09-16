import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemEditorial from './listItems/ItemEditorial';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS } from '@/data/data';


export default function EditorialExperienceTimeLine({ sortEditorialHistory, editorial_experience, deleteEditorialExperience, openFormForEditorialExperienceEdit }) {

    const onDragEnd = (result) => {

        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const tempArray = [...editorial_experience];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        sortEditorialHistory(tempArray);
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minHeight: '20vh'
            }}>
                {
                    editorial_experience.length != 0 &&
                    <Droppable droppableId={DROPPABLE_TYPE_IDS.editorialExperienceTimeline}>
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
                                        editorial_experience.map((experience, index) => {
                                            return (
                                                <Draggable draggableId={experience.experienceID} key={experience.experienceID} index={index}>
                                                    {(provided, snapshot) => (
                                                        <TimelineItem ref={provided.innerRef} key={experience.experienceID}  {...provided.draggableProps} {...provided.dragHandleProps}>

                                                            <TimelineSeparator>
                                                                <TimelineDot color='success' />

                                                            </TimelineSeparator>
                                                            <TimelineContent sx={{ paddingBottom: 3 }}>
                                                                <ItemEditorial experience={experience} deleteEditorialExperience={deleteEditorialExperience} openFormForEditorialExperienceEdit={openFormForEditorialExperienceEdit} isDragging={snapshot.isDragging} />
                                                            </TimelineContent>
                                                        </TimelineItem>
                                                    )}
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
                    editorial_experience.length == 0 && <Typography align='center'>No Records are added yet. <br></br> Start adding new by clicking Add button above.</Typography>
                }
            </Box>
        </DragDropContext>
    );
}