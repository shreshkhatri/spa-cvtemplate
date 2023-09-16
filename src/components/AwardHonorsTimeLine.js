import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS } from '@/data/data';
import ItemAwardHonor from './listItems/ItemAwardHonor';


export default function AwardHonorsTimeLine({ sortAwardHistory, awards_honors, deleteAward, openFormForAwardHonorEdit }) {

    const onDragEnd = (result) => {

        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const tempArray = [...awards_honors];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        sortAwardHistory(tempArray);
    }


    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minHeight: '20vh'
            }}>
                {
                    awards_honors.length !== 0 &&

                    <Droppable droppableId={DROPPABLE_TYPE_IDS.awawardTimeline}>
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
                                    awards_honors.map((award, index) => {
                                        return (

                                            <Draggable draggableId={award.award_honor_ID} key={award.award_honor_ID} index={index}>
                                                {
                                                    (provided, snapshot) => (
                                                        <TimelineItem ref={provided.innerRef} key={award.award_honor_ID} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                            <TimelineSeparator>
                                                                <TimelineDot color='success' />
                                                                {(awards_honors.length - 1) !== index && <TimelineConnector />}
                                                            </TimelineSeparator>
                                                            <TimelineContent sx={{ paddingBottom: 3 }}>
                                                                <ItemAwardHonor award={award} deleteAward={deleteAward} openFormForAwardHonorEdit={openFormForAwardHonorEdit} isDragging={snapshot.isDragging} />
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

                        )}


                    </Droppable>
                }
                {
                    awards_honors.length == 0 && <Typography align='center'>No awards / honors added yet. <br></br> Start adding new by clicking link above.</Typography>
                }
            </Box>
        </DragDropContext>

    );
}