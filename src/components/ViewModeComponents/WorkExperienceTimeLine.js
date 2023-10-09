import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemExperience from './listItems/itemExperience';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


export default function WorkExperienceTimeLine({  work_history }) {
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
              
                    <Timeline
                      
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 2,
                        },
                      
                      }}
                    >

                      {
                        work_history.map((work_experience, index) => {
                          return (
                              <TimelineItem key={work_experience._id} >

                                <TimelineSeparator>
                                  <TimelineDot color='success' />
                                  {(work_history.length - 1) !== index && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 1 }}>
                                  <ItemExperience work_experience={work_experience}  />
                                </TimelineContent>
                              </TimelineItem>
                            )                         
                        })
                      }
                    </Timeline>
            }
            {
              work_history.length == 0 && <Typography align='center'>No experiences added yet.</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}