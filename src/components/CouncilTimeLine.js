import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import ItemCouncil from './listItems/ItemCouncil';


export default function CouncilTimeLine({ councils, deleteCouncil ,openFormForCouncilEdit}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight:'20vh'
        }}>
            {
                councils.length !== 0 &&
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 2,
                        },
                    }}
                >

                    {
                        councils.map((council) => {
                            return <TimelineItem key={council.councilID} >

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                    <ItemCouncil council={council} deleteCouncil={deleteCouncil} openFormForCouncilEdit={openFormForCouncilEdit}/>
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>
            }
            {
                councils.length == 0 && <Typography align='center'>No Councils added yet. <br></br> Start adding new by clicking add button above.</Typography>
            }
        </Box>

    );
}