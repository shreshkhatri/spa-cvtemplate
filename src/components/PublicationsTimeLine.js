import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BiAddToQueue } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {SiResearchgate} from 'react-icons/si';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewPublicationForm from './forms/NewPublicationForm';
const _ = require("lodash");

 

export default function PublicationsTimeLine({publications,deletePublications, addNewPublication}) {
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: 5
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: {
          xs:'column',
          sm:'column',
          md:'row',
          lg:'row'
        },
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6">
          <SiResearchgate size={20} /> Publications
        </Typography>
          <Button variant='outlined' color='inherit' onClick={deletePublications} size='small'><TiDeleteOutline /> Delete this section</Button>
      </Box>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {
          publications.map((publication) => {
            return (
              <TimelineItem key={publication.publicationID}>

                <TimelineSeparator>
                  <TimelineDot color='success' />
                </TimelineSeparator>
                <TimelineContent sx={{ paddingBottom: 3 }}>

                  <Typography sx={{lineHeight:1.2}} variant="body2" gutterBottom>
                  {publication.authors.length !== 0 &&
                      publication.authors.reduce(
                        (acc, author, current_index) => {
                          if (!_.isEmpty(author.last_name)) {
                            return (
                              acc +
                              author.last_name[0].toUpperCase() +
                              ". " +
                              author.first_name +
                              " , "
                            );
                          } else return acc + author.first_name + " , ";
                        },
                        ""
                      )} ({publication.publication_date.substring(0,4)}) {publication.title}
                    <br></br>
                  <span style={{fontStyle:'italic'}}>{publication.publication_event}, {publication.publication_venue}</span>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                  <span style={{fontWeight:'bold'}}>Abstract</span> <br></br>
                    {publication.abstract}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            )

          })
        }


      </Timeline>
    </Box>
  );
}


