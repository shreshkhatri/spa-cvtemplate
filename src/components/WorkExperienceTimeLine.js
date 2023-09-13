import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import ItemExperience from './listItems/itemExperience';


export default function WorkExperienceTimeLine({ work_history, deleteWorkExperience, openFormForWorkExperienceEdit }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight:'20vh'
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
            work_history.map((work_experience,index) => {
              return <TimelineItem key={work_experience.employmentID} >

                <TimelineSeparator>
                  <TimelineDot color='success' />
                  {(work_history.length-1)!==index && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ paddingBottom: 1 }}>
                  <ItemExperience work_experience={work_experience} deleteWorkExperience={deleteWorkExperience} openFormForWorkExperienceEdit={openFormForWorkExperienceEdit} />
                </TimelineContent>
              </TimelineItem>


            })
          }
        </Timeline>
      }
      {
        work_history.length == 0 && <Typography align='center'>No experiences added yet. <br></br> Start adding new qualification by clicking link above.</Typography>
      }
    </Box>

  );
}