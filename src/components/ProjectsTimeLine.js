import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import ItemProject from './listItems/ItemProject';


export default function ProjectsTimeline({ projects, deleteProject,openFormForProjectEdit }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight:'20vh'
        }}>
            
            {
                projects.length != 0 &&

                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 2,
                        },
                    }}
                >

                    {
                        projects.map((project) => {
                            return <TimelineItem key={project.projectID} >

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                    <ItemProject project={project} deleteProject={deleteProject} openFormForProjectEdit={openFormForProjectEdit}/>
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>

            }

            {
                projects.length == 0 && <Typography align='center'>No Projects added yet. <br></br> Start adding new qualification by clicking link above.</Typography>
            }
        </Box>

    );
}