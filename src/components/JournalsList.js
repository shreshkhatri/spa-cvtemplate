import Box from '@mui/material/Box';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import ItemJournal from './listItems/ItemJournal';
import { IconButton, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useState } from 'react';

export default function JournalsList({ deleteJournalsSection, setOpenNewJournalForm, journals, deleteJournal, openFormForJournalEdit }) {
    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Box id='journals' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <Typography variant="h6">
                    Journals
                </Typography>
                <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
                    <Tooltip title='Add journal Details'>
                        <IconButton onClick={() => setOpenNewJournalForm(true)}>
                            <LibraryAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete journals section'>
                        <IconButton onClick={deleteJournalsSection}>
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
                                        <ItemJournal journal={journal} deleteJournal={deleteJournal} openFormForJournalEdit={openFormForJournalEdit} />
                                    </TimelineContent>
                                </TimelineItem>


                            })
                        }
                    </Timeline>
                }

                {journals.length == 0 && <Typography align='center'>No journals added yet. <br></br> Start adding new journal by clicking Add button above.</Typography>}
            </Box>
        </Box>
    )
}