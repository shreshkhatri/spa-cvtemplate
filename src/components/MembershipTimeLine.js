import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import ItemMembership from './listItems/ItemMembership';

export default function MembershipTimeLine({ memberships, deleteMembership ,openFormForMembershipEdit}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight:'20vh'
        }}>
            {
                memberships.length !== 0 &&
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 1,
                        },
                    }}
                >
                    {
                        memberships.map((membership) => {
                            return <TimelineItem key={membership.membershipID} >

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                    <ItemMembership membership={membership} deleteMembership={deleteMembership} openFormForMembershipEdit={openFormForMembershipEdit}/>
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>
            }
            {
                memberships.length == 0 && <Typography align='center'>No memberships added yet. <br></br> Start adding new by clicking button above.</Typography>
            }
        </Box>
    );
}