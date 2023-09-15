import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemEditorial from './listItems/ItemEditorial';



export default function EditorialExperienceTimeLine({ editorial_experience, deleteEditorialExperience, openFormForEditorialExperienceEdit }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight:'20vh'
        }}>
            {
                editorial_experience.length != 0 &&
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 2,
                        },
                    }}
                >

                    {
                        editorial_experience.map((experience) => {
                            return <TimelineItem key={experience.experienceID} >

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                    
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                    <ItemEditorial experience={experience} deleteEditorialExperience={deleteEditorialExperience} openFormForEditorialExperienceEdit={openFormForEditorialExperienceEdit} />
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>
            }
            {
                editorial_experience.length == 0 && <Typography align='center'>No Records are added yet. <br></br> Start adding new by clicking Add button above.</Typography>
            }
        </Box>

    );
}