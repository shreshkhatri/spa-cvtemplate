import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemCommittee from './listItems/ItemCommittee';
import {  Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS } from '@/data/data';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useState } from 'react';

export default function CommitteeTimeLine({deleteCommitteeSection,  setOpenNewCommitteeForm, committees, deleteCommittee, openFormForCommitteeEdit }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
   
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
        <Box id='committees' sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <Typography variant="h6">
              Committees Associations
            </Typography>
            <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
              <Tooltip title='Add Committee Memberships'>
                <IconButton onClick={() => setOpenNewCommitteeForm(true)}>
                  <LibraryAddOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete Committee Memberships Section'>
                <IconButton onClick={deleteCommitteeSection}>
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
                    committees.length !== 0 &&

                    <Droppable droppableId={DROPPABLE_TYPE_IDS.committeeTimeline}>
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
                                }}>

                                {
                                    committees.map((committee, index) => {
                                        return <Draggable draggableId={committee.committeeID} key={committee.committeeID} index={index}>
                                            {
                                                (provided, snapshot) => (
                                                    <TimelineItem ref={provided.innerRef} key={committee.committeeID} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                        <TimelineSeparator>
                                                            <TimelineDot color='success' />
                                                        </TimelineSeparator>
                                                        <TimelineContent sx={{ paddingBottom: 3 }}>
                                                            <ItemCommittee committee={committee} deleteCommittee={deleteCommittee} openFormForCommitteeEdit={openFormForCommitteeEdit} isDragging={snapshot.isDragging}/>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )}
                                        </Draggable>
                                    })
                                }
                                {provided.placeholder}
                            </Timeline>
                        )}
                    </Droppable>
                }
                {
                    committees.length == 0 && <Typography align='center'>No Committees added yet. <br></br> Click Add button to start adding Committee memberships.</Typography>
                }
            </Box>
            </Box>

    );
}