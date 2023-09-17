import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot'
import ItemConference from './listItems/ItemConference';

export default function ConferencesList({ conferences, deleteConference,openFormForConferenceEdit }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '20vh'
        }}>


            {conferences.length == 0 && <Typography align='center'>No conferences added yet. <br></br> Start adding new conferences by clicking Add button above.</Typography>}

            {conferences.length != 0 &&


                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 2,
                        },
                    }}
                >

                    {
                        conferences.map((conference, index) => {
                            return <TimelineItem key={conference.conferenceID} >

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                    
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 3 }}>
                                    <ItemConference conference={conference} deleteConference={deleteConference} openFormForConferenceEdit={openFormForConferenceEdit}/>
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>
            }
        </Box>


    );
}

