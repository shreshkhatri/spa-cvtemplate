import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineBriefcase } from 'react-icons/hi';


export default function ProjectsTimeline({ projects, deleteProjects }) {
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
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row'
                },
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6">
                    <HiOutlineBriefcase size={20} /> Projects
                </Typography>


                <Button color='error' onClick={deleteProjects} variant='outlined' size='small'><AiOutlineDelete />Delete this section</Button>

            </Box>


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
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ paddingBottom: 3 }}>
                                <Typography
                                    sx={{ m: 'auto 0' }}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {project.start_date} - {project.isContinue ? "continue" : project.end_date}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    {project.project_title} , {project.designation}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {project.city} , {project.country.label}
                                </Typography>

                            

                                <Typography variant="body2" gutterBottom>Project Description <br></br>
                                    {project.description}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>


                    })
                }
            </Timeline>
        </Box>

    );
}