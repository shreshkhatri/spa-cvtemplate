import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemCommittee from './listItems/ItemCommittee';


export default function CommitteeTimeLine({ committees, deleteCommittee, openFormForCommitteeEdit }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight:'20vh'
        }}>
            {
                committees.length !== 0 &&
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 2,
                        },
                    }}
                >

                    {
                        committees.map((committee) => {
                            return <TimelineItem key={committee.committeeID} >

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                    <ItemCommittee committee={committee} deleteCommittee={deleteCommittee} openFormForCommitteeEdit={openFormForCommitteeEdit}/>
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>
            }
            {
                committees.length == 0 && <Typography align='center'>No Committees added yet. <br></br> Click Add button to start adding Committee memberships.</Typography>
            }
        </Box>

    );
}