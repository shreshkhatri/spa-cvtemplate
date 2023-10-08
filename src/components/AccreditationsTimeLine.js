import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';

import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS, DROPPABLE_TYPES } from '@/data/data';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ItemAccreditation from './listItems/ItemAccreditation';

export default function AccreditationsTimeLine({ deleteAccreditation, setOpenNewAccreditionExperienceForm, accreditations_experience, deleteAccreditationsSection, openFormForAccreditationExperienceEdit }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [expanded, setExpanded] = useState(true);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          aria-controls="accreditations-history-header-content"
          id="accreditations-history-header"
        >
          <Box id='accreditations_experience' sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }} >
            <Typography variant="h6">
              Accreditations Experience
            </Typography>
            <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
              <Tooltip title='Add  Accreditation Experience'>
                <IconButton onClick={() => setOpenNewAccreditionExperienceForm(true)}>
                  <LibraryAddOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='delete Accreditations history'>
                <IconButton onClick={deleteAccreditationsSection}>
                  <HighlightOffOutlinedIcon />
                </IconButton>
              </Tooltip>

              {!expanded &&
                <Tooltip title='expand education history'>
                  <IconButton onClick={() => setExpanded(true)}>
                    <KeyboardDoubleArrowDownIcon />
                  </IconButton>
                </Tooltip>
              }

              {expanded &&
                <Tooltip title='collapse education history'>
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
              accreditations_experience.length !== 0 &&

              <Droppable droppableId={DROPPABLE_TYPE_IDS.accreditationsExperienceTimeline} type={DROPPABLE_TYPES.Accreditation}>
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
                        accreditations_experience.map((accreditation, index) => {
                          return (
                            <Draggable draggableId={accreditation._id} key={accreditation._id} index={index} >
                              {(provided, snapshot) => {
                                return (<TimelineItem ref={provided.innerRef} key={accreditation._id} {...provided.draggableProps} {...provided.dragHandleProps}>


                                  <TimelineContent sx={{ paddingBottom: 1 }}>
                                    <ItemAccreditation accreditation={accreditation} deleteAccreditation={deleteAccreditation} openFormForAccreditationExperienceEdit={openFormForAccreditationExperienceEdit} isDragging={snapshot.isDragging} />
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
              accreditations_experience.length == 0 && <Typography align='center'>No Accreditations added yet. <br></br> Start adding new Accreditation by clicking button above.</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>


  );
}