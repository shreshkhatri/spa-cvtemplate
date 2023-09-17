import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemPublication from './listItems/ItemPublication';
const _ = require("lodash");
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useState } from 'react';


export default function PublicationsTimeLine({ deletePublications, setOpenNewPublicationForm, publications, deletePublication, openFormForPublicationEdit }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const pubTypesAsObject = _.groupBy(publications, 'type');
  const pubTypesAsArray = Object.getOwnPropertyNames(pubTypesAsObject);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
      <Box id='publications' sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <Typography variant="h6">
          Publications
        </Typography>
        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
          <Tooltip title='Add Editoial Experience'>
            <IconButton onClick={() => setOpenNewPublicationForm(true)}>
              <LibraryAddOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Publications Section'>
            <IconButton onClick={deletePublications}>
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
          publications.length !== 0 &&

          pubTypesAsArray.map(type => {
            return (
              <Box key={type} sx={{ paddingLeft: 5 }}>
                <Typography>{type}</Typography>

                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >

                  {
                    publications.filter(publication => publication.type == type)
                      .map(publication => {
                        return (
                          <TimelineItem key={publication.publicationID}>

                            <TimelineSeparator>
                              <TimelineDot color='success' />
                            </TimelineSeparator>
                            <TimelineContent sx={{ paddingBottom: 3 }}>
                              <ItemPublication publication={publication} deletePublication={deletePublication} openFormForPublicationEdit={openFormForPublicationEdit} />
                            </TimelineContent>
                          </TimelineItem>
                        )
                      })
                  }
                </Timeline>

              </Box>)
          })
        }
        {
          publications.length == 0 && <Typography align='center'>No Publications added yet. <br></br> Start adding new qualification by clicking Add Button.</Typography>
        }
      </Box>
    </Box>
  );
}


