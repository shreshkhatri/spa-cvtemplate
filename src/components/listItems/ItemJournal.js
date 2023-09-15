import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getAllAuthorsName, getYear, } from '@/assets/utilityFunctions';
import _ from 'lodash';
import { Box } from '@mui/material';

export default function ItemJournal({ journal, deleteJournal , openFormForJournalEdit}) {

    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {
                xs: 'column',
                sm: 'row'
            },
            alignItems: 'center',
            width: '100%',
            boxShadow: isMouseOver ? 1 : 0,
            borderRadius: isMouseOver ? 1 : 0,
            p: 1
        }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Box sx={{ flexGrow: 1 }}>
                        <Typography display='inline' >
                            {getAllAuthorsName(journal.authors)}
                        </Typography>
                        {journal.published_on ? <Typography display='inline' > ( {getYear(journal.published_on)} )</Typography> : null}
                        <Typography display='inline' sx={{ fontWeight: 'bold' }} > {journal.title} </Typography>
                        {!_.isEmpty(journal.journal) ? <Typography display='inline' sx={{  fontStyle: 'italic' }} > , {journal.journal} </Typography> : null}
                        {!_.isEmpty(journal.vol) ? <Typography display='inline' sx={{  fontStyle: 'italic' }} > , Vol - {journal.vol} </Typography> : null}
                        {!_.isEmpty(journal.issue) ? <Typography display='inline' sx={{  fontStyle: 'italic' }} > , Issue - {journal.issue} </Typography> : null}
                        
                        {!_.isEmpty(journal.page_range) ? <Typography display='inline'  > , pages {journal.page_range} </Typography> : null}

                        {!_.isEmpty(journal.summary) ? <Typography variant='body2' sx={{paddingTop:1}}>{journal.summary}</Typography> : null}

                        
                </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', visibility: isMouseOver ? 'visible' : 'hidden' }}>
                <Button variant='text' sx={{ fontWeight: '780', color: 'success.main', textDecoration: 'underline' }} size='small' onClick={()=>openFormForJournalEdit(journal.journalID)}>Edit</Button>
                <Button variant='text' sx={{ fontWeight: '780', color: 'error.main', textDecoration: 'underline' }} size='small' onClick={() => deleteJournal(journal.journalID)}>Delete</Button>
            </Box>

        </Box>
    )
}