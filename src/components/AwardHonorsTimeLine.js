import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import ItemAwardHonor from './listItems/ItemAwardHonor';


export default function AwardHonorsTimeLine({ awards_honors, deleteAward, openFormForAwardHonorEdit }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '20vh'
        }}>
            {
                awards_honors.length !== 0 &&
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 2,
                        },
                    }}
                >

                    {
                        awards_honors.map((award) => {
                            return <TimelineItem key={award.award_honor_ID} >

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                    <ItemAwardHonor award={award} deleteAward={deleteAward} openFormForAwardHonorEdit={openFormForAwardHonorEdit} />
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>
            }
            {
                awards_honors.length == 0 && <Typography align='center'>No awards / honors added yet. <br></br> Start adding new by clicking link above.</Typography>
            }
        </Box>

    );
}