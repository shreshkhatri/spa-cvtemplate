
import Box from '@mui/material/Box';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import ItemJournal from './listItems/ItemJournal';


export default function JournalsList({ journals, deleteJournal ,openFormForJournalEdit}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '20vh'
        }}>

            {
                journals.length !== 0 &&
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 2,
                        },
                    }}
                >

                    {
                        journals.map((journal) => {
                            return <TimelineItem key={journal.journalID}>

                                <TimelineSeparator>
                                    <TimelineDot color='success' />
                                </TimelineSeparator>
                                <TimelineContent sx={{ paddingBottom: 1 }}>
                                    <ItemJournal journal={journal} deleteJournal={deleteJournal} openFormForJournalEdit={openFormForJournalEdit}/>
                                </TimelineContent>
                            </TimelineItem>


                        })
                    }
                </Timeline>
            }

            {journals.length == 0 && <Typography align='center'>No journals added yet. <br></br> Start adding new journal by clicking Add button above.</Typography>}
        </Box>
    )
}