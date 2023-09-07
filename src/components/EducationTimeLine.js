import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai';
import { GiGraduateCap } from 'react-icons/gi';

export default function EducationTimeLine({ education_history, deleteEducationHistory }) {
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
                    <GiGraduateCap size={20} /> Education
                </Typography>
                <Button size='small' variant="outlined" color='error' onClick={deleteEducationHistory}><AiOutlineDelete />Delete this section</Button>
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
                    education_history.map((degree) => {
                        return <TimelineItem key={degree.degreeID} >

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
                                    {degree.start_date} - {degree.isContinue ? "continue" : degree.end_date}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    {degree.degree} , {degree.institution} ,{degree.city} , {degree.country.label}
                                </Typography>

                                <Typography variant="body2" gutterBottom>{degree.grade}</Typography>

                                <Typography variant="body2" gutterBottom>Course Summary <br></br>
                                    {degree.course_summary}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>


                    })
                }
            </Timeline>
        </Box>

    );
}