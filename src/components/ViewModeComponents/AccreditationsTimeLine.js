import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import { IconButton, Tooltip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ItemAccreditation from './listItems/ItemAccreditation';

export default function AccreditationsTimeLine({ accreditations_experience}) {
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

              
                    <Timeline
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 2,
                        },

                      }}
                    >
                      {
                        accreditations_experience.map((accreditation) => {
                          return (
                            
                              
                            <TimelineItem  key={accreditation._id}>


                                  <TimelineContent sx={{ paddingBottom: 1 }}>
                                    <ItemAccreditation accreditation={accreditation}  />
                                  </TimelineContent>
                                </TimelineItem>
                                )
                              
                        })
                      }
                    </Timeline>
            }

            {
              accreditations_experience.length == 0 && <Typography align='center'>No Accreditations added yet.</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>


  );
}