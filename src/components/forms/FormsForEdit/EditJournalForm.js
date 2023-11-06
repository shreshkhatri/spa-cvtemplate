import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '1%',
    left: '1%',
    bottom: '1%',
    right: '1%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24
};



export default function EditJournalForm({ open, setOpen, jrnl, editJournal }) {

    const [authors, updateAuthors] = useState(jrnl.authors);

    const [title, setTitle] = useState(jrnl.title);
    const [journal, setJournal] = useState(jrnl.journal);
    const [vol, setVol] = useState(jrnl.vol);
    const [issue, setIssue] = useState(jrnl.issue);
    const [pageRange, setPageRange] = useState(jrnl.page_range);
    const [startDate, setStartDate] = useState(dayjs(jrnl.published_on));
    const [summary, setSummary] = useState(jrnl.summary);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        setTitle(jrnl.title);
        setJournal(jrnl.journal);
        setVol(jrnl.vol);
        setIssue(jrnl.issue);
        setPageRange(jrnl.page_range);
        setStartDate(dayjs(jrnl.published_on));
        setSummary(jrnl.summary);
        setFirstName('');
        setLastName('');

    }, [jrnl]);




    function resetFields() {
        setTitle('');
        updateAuthors([]);
        setJournal('');
        setVol('');
        setIssue('');
        setPageRange('');
        setStartDate(null);
        setSummary();
        setFirstName('');
        setLastName('');
    }


    // a function to remove the author from the list
    function removeAuthor(authorID) {
        const tempAuthList = authors.filter(author => author._id != authorID)
        updateAuthors(tempAuthList);
    }

    // a function to add the author to the list of authors
    function addAuthor() {
        if (firstName.trim().length != 0 && lastName.trim().length != 0) {
            updateAuthors(prevList => ([...prevList, { _id: uniqid(), first_name: firstName, last_name: lastName }]))
            setFirstName('');
            setLastName('');
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        if (authors.length === 0) {
            alert('Please add at least one author for the Journal.');
            return;
        }
        editJournal({
            _id: jrnl._id,
            title: title,
            journal: journal,
            summary: summary,
            vol: vol,
            issue: issue,
            published_on: startDate ? startDate.format('YYYY-MM-DD') : null,
            page_range: pageRange,
            authors: authors.map(author=>({first_name: author.first_name, last_name: author.last_name })),
            summary: summary
        })

        resetFields()
        setOpen(false)
    };

    return (

        <Modal
            aria-labelledby="transition-modal-add-new-experience-record"
            aria-describedby="transition-modal-add-new-education-record"
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 100,
                },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 'inherit',
                        overflowY: 'scroll',
                        paddingY:{
                            xs:1,
                            sm:5,
                        } ,
                        paddingX:{
                            xs:1,
                            sm:10
                        },
                        ...style
                    }}
                >

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Typography variant='h5' sx={{color:'black'}}>Journal Information</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="journal-title"
                                    required
                                    fullWidth
                                    id="journal-title"
                                    label="Title"
                                    size='small'
                                    value={title}
                                    autoFocus
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="journal"
                                    required
                                    fullWidth
                                    id="journal"
                                    label="Journal "
                                    size='small'
                                    value={journal}
                                    autoFocus
                                    onChange={e => setJournal(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="journal-summary"
                                    label="Journal Summary ( if available )"
                                    size='small'
                                    name="journal-summary"
                                    autoComplete='off'
                                    multiline
                                    rows={3}
                                    value={summary}
                                    onChange={e => setSummary(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    autoComplete='off'
                                    name="vol"

                                    fullWidth
                                    id="vol"
                                    label="Vol. "
                                    size='small'
                                    value={vol}
                                    autoFocus
                                    onChange={e => setVol(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    autoComplete='off'
                                    name="issue"

                                    fullWidth
                                    id="issue"
                                    label="Issue. "
                                    size='small'
                                    value={issue}
                                    autoFocus
                                    onChange={e => setIssue(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="page-range"
                                    label="Page Range"
                                    size='small'
                                    name="page-range"
                                    autoComplete='off'
                                    value={pageRange}
                                    onChange={e => setPageRange(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker size='small' value={startDate} label="Published Date" format='LL' onChange={date => setStartDate(date)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>


                        </Grid>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            padding: 1
                        }}>
                            <Typography variant='body1' sx={{color:'black'}}>Authors</Typography>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                gap: 1
                            }}>
                                {
                                    authors.map((author) => {
                                        return (<Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            gap: 1
                                        }} key={author._id}>
                                            <Typography variant='body2' sx={{color:'black'}}> {author.first_name}</Typography>
                                            <Typography sx={{ flexGrow: 1 ,color:'black'}} variant='body2'>{author.last_name}</Typography>
                                            <Button sx={{textTransform:'none',}} variant='outlined' color='error' size='small' onClick={() => removeAuthor(author._id)}>Remove Author</Button>
                                        </Box>
                                        )

                                    })
                                }
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'row'
                                    },
                                    gap: 1
                                }}>
                                    <TextField
                                        autoComplete='off'
                                        name="first-name"
                                        value={firstName}
                                        id="first-name"
                                        label="First Name"
                                        size='small'
                                        autoFocus
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                    <TextField
                                        autoComplete='off'
                                        name="last-name"
                                        value={lastName}
                                        id="last-name"
                                        label="Last Name"
                                        size='small'
                                        autoFocus
                                        onChange={e => setLastName(e.target.value)}

                                    />
                                    <Button
                                        size='small'
                                        color='success'
                                        variant='outlined'
                                        onClick={addAuthor}
                                        sx={{
                                            textTransform:'none',
                                        }}
                                    >
                                        Add Author
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                sm: 'row'
                            },
                            paddingTop: 1,
                            gap: 1
                        }}>
                            <Button
                                fullWidth
                                size='small'
                                variant="contained"
                                sx={{
                                    backgroundColor: 'error.main',
                                    padding: 1,
                                    flexGrow: 1,
                                    textTransform:'none',
                                }}
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size='small'
                                sx={{
                                    backgroundColor: 'success.main',
                                    padding: 1,
                                    flexGrow: 1,
                                    textTransform:'none',
                                }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>


    );
}