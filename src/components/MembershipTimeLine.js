import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemMembership from './listItems/ItemMembership';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useState } from 'react';

export default function MembershipTimeLine({ deleteMembershipSection, setOpenNewMembershipForm, memberships, deleteMembership, openFormForMembershipEdit }) {
    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Box id='memberships' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <Typography variant="h6">
                    Memberships
                </Typography>
                <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
                    <Tooltip title='Add Membership'>
                        <IconButton onClick={() => setOpenNewMembershipForm(true)}>
                            <LibraryAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete membership section'>
                        <IconButton onClick={deleteMembershipSection}>
                            <HighlightOffOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minHeight: '20vh'
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
                                        <ItemMembership membership={membership} deleteMembership={deleteMembership} openFormForMembershipEdit={openFormForMembershipEdit} />
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
        </Box>
    );
}