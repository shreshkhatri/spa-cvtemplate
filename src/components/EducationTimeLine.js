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
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import ItemDegree from './listItems/ItemDegree';
import { DROPPABLE_TYPE_IDS } from '@/data/data';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export default function EducationTimeLine({ education_history, deleteEducationDegree, openFormForDegreeEdit ,setOpenNewEducationForm, deleteEducationHistory}) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box id='education_history' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Typography variant="h6">
                    Education
                </Typography>
                <Box>
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
                </Box>
            </Box>
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
                                        border: snapshot.isDraggingOver ? 1 : 0,
                                        borderColor: snapshot.isDraggingOver ? '#f9f6ee' : null,
                                        boxShadow: snapshot.isDraggingOver ? 1 : 0,
                                        borderRadius: snapshot.isDraggingOver ? 2 : 0,

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
        </Box>

    );
}