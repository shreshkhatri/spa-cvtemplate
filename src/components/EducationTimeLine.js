import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash';
import ItemDegree from './listItems/ItemDegree';
import { DROPPABLE_TYPE_IDS } from '@/data/data';

export default function EducationTimeLine({ sortEducationHistory, education_history, deleteEducationDegree, openFormForDegreeEdit }) {

    const onDragEnd = (result) => {

        console.log(result)

        const {destination, source, draggableId} = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index ) return;

        const tempArray = [...education_history];
        const deletedItem = tempArray.splice(source.index,1);
        tempArray.splice(destination.index,0,...deletedItem);
        sortEducationHistory(tempArray);
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
                education_history.length !== 0 &&
                
                    <Droppable droppableId={DROPPABLE_TYPE_IDS.educationTimeline}>
                        {
                            (provided, snapshot) => (
                                <Timeline ref={provided.innerRef} {...provided.droppableProps}
                                    sx={{
                                        [`& .${timelineItemClasses.root}:before`]: {
                                            flex: 0,
                                            padding: 2,
                                        },
                                        border:snapshot.isDraggingOver?1:0,
                                        borderColor:snapshot.isDraggingOver?'#f9f6ee':null,
                                        boxShadow:snapshot.isDraggingOver?1:0,
                                        borderRadius:snapshot.isDraggingOver?2:0,

                                    }}
                                >

                                    {
                                        education_history.map((degree, index) => {
                                            return (
                                                <Draggable draggableId={degree.degreeID} key={degree.degreeID} index={index}>
                                                    {(provided, snapshot) => {
                                                        return (<TimelineItem ref={provided.innerRef} key={degree.degreeID} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                            <TimelineSeparator>
                                                                <TimelineDot color='success' />
                                                                {(education_history.length - 1) !== index && <TimelineConnector />}
                                                            </TimelineSeparator>
                                                            <TimelineContent sx={{ paddingBottom: 1 }}>
                                                                <ItemDegree degree={degree} deleteEducationDegree={deleteEducationDegree} openFormForDegreeEdit={openFormForDegreeEdit} isDragging={snapshot.isDragging}/>
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
        </Box></DragDropContext>

    );
}