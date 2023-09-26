import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemExperience from './listItems/itemExperience';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS,DROPPABLE_TYPES } from '@/data/data';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


export default function WorkExperienceTimeLine({ deleteWorkHistory, setOpenNewExperienceForm, work_history, deleteWorkExperience, openFormForWorkExperienceEdit }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          aria-controls="work-history-header-content"
          id="work-history-header"
        >
          <Box id='work_history' sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <Typography variant="h6">
              Experiences
            </Typography>
            <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
              <Tooltip title='Add New Experience'>
                <IconButton onClick={() => setOpenNewExperienceForm(true)}>
                  <LibraryAddOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete all experiences'>
                <IconButton onClick={deleteWorkHistory}>
                  <HighlightOffOutlinedIcon />
                </IconButton>
              </Tooltip>
              {!expanded &&
                <Tooltip title='expand experience history'>
                  <IconButton onClick={() => setExpanded(true)}>
                    <KeyboardDoubleArrowDownIcon />
                  </IconButton>
                </Tooltip>
              }

              {expanded &&
                <Tooltip title='collapse experience history'>
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
              work_history.length != 0 &&
              <Droppable droppableId={DROPPABLE_TYPE_IDS.experienceTimeline} type={DROPPABLE_TYPES.Experience}>
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
                        work_history.map((work_experience, index) => {
                          return <Draggable draggableId={work_experience.employmentID} key={work_experience.employmentID} index={index}>
                            {(provided, snapshot) => (
                              <TimelineItem ref={provided.innerRef} key={work_experience.employmentID} {...provided.draggableProps} {...provided.dragHandleProps}>

                                <TimelineSeparator>
                                  <TimelineDot color='success' />
                                  {(work_history.length - 1) !== index && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 1 }}>
                                  <ItemExperience work_experience={work_experience} deleteWorkExperience={deleteWorkExperience} openFormForWorkExperienceEdit={openFormForWorkExperienceEdit} isDragging={snapshot.isDragging} />
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
              work_history.length == 0 && <Typography align='center'>No experiences added yet. <br></br> Start adding new qualification by clicking link above.</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}