import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';

export default function AccreditationsTimeLine({ accreditations, deleteAccreditation  }) {

  const onDragEnd = (result) => {

    const {destination, source, draggableId} = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index ) return;

    const tempArray = [...accreditations];
    const deletedItem = tempArray.splice(source.index,1);
    tempArray.splice(destination.index,0,...deletedItem);
    sortEducationHistory(tempArray);
}


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight:'20vh'
    }}>
      
      {
        accreditations.length != 0 &&
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 2,
            },
          }}
        >

          {
            accreditations.map((accreditation) => {
              return <TimelineItem key={accreditation.experienceID} >

                <TimelineSeparator>
                  <TimelineDot color='success' />
                  
                </TimelineSeparator>
                <TimelineContent sx={{ paddingBottom: 3 }}>
                  

                  <Typography variant="h6" gutterBottom>
                    {accreditation.role} | {accreditation.organization } | {accreditation.date.substring(0, 4)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {accreditation.city} , {accreditation.country.label}
                  </Typography>

                  <Typography variant="body2" gutterBottom>Duties & Responsibilities <br></br>
                    {accreditation.description}
                  </Typography>

                

                  <Button variant='outlined' color='error' size='small' onClick={()=> deleteAccreditation(accreditation.experienceID)}>Delete</Button>
                </TimelineContent>
              </TimelineItem>


            })
          }
        </Timeline>
      }
      {
        accreditations.length == 0 && <Typography align='center'>No Accreditations added yet. <br></br> Start adding new accreditation by clicking link above.</Typography>
      }
    </Box>

  );
}