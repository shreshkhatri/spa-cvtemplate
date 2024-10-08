import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS ,DROPPABLE_TYPES} from '@/data/data';
import ItemAwardHonor from './listItems/ItemAwardHonor';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function AwardHonorsTimeLine({ deleteAwardSection, setOpenNewAwardHonorForm, awards_honors, deleteAward, openFormForAwardHonorEdit }) {
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
                            <Tooltip title='Add Award/Honor Details'>
                                <IconButton onClick={() => setOpenNewAwardHonorForm(true)}>
                                    <LibraryAddOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete Awards/Honors section'>
                                <IconButton onClick={deleteAwardSection}>
                                    <HighlightOffOutlinedIcon />
                                </IconButton>
                            </Tooltip>
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

                            <Droppable droppableId={DROPPABLE_TYPE_IDS.awawardTimeline} type={DROPPABLE_TYPES.Award}>
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

                                                    <Draggable draggableId={award._id} key={award._id} index={index}>
                                                        {
                                                            (provided, snapshot) => (
                                                                <TimelineItem ref={provided.innerRef} key={award._id} {...provided.draggableProps} {...provided.dragHandleProps}>

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
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}