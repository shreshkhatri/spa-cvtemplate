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
import CountrySelector from '../../CountrySelector';
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



export default function EditConferenceForm({ open, setOpen, conference, editConference }) {
    const [title, setTitle] = useState(conference.title);
    const [authors, setAuthors] = useState(conference.authors);
    const [conferenceName, setConferenceName] = useState(conference.name);
    const [conferenceSummary, setConferenceSummary] = useState(conference.summary);
    const [conferenceCountry, setConferenceCountry] = useState(conference.country);
    const [conferenceCity, setConferenceCity] = useState(conference.city);
    const [pageRange, setPageRange] = useState(conference.page_range);
    const [startDate, setStartDate] = useState(dayjs(conference.start_date));
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        setTitle(conference.title);
        setAuthors(conference.authors);
        setConferenceName(conference.name);
        setConferenceSummary(conference.summary);
        setConferenceCountry(conference.country);
        setConferenceCity(conference.city);
        setPageRange(conference.page_range);
        setStartDate( dayjs(conference.start_date));
        setFirstName('')
        setLastName('')
      }, [conference]);
      


    function resetFields() {
        setTitle('');
        setAuthors([]);
        setConferenceSummary('');
        setConferenceCountry(null);
        setConferenceCity('');
        setPageRange('');
        setStartDate(null);
        setConferenceName('');
        setFirstName('');
        setLastName('');
    }


    // a function to remove the author from the list
    function removeAuthor(authorID) {
        const tempAuthList = authors.filter(author => author._id != authorID)
        setAuthors(tempAuthList);
    }

    // a function to add the author to the list of authors
    function addAuthor() {
        if (firstName.trim().length != 0 && lastName.trim().length != 0) {
            setAuthors(prevList => ([...prevList, { _id: uniqid(), first_name: firstName, last_name: lastName }]))
            setFirstName('');
            setLastName('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (authors.length === 0) {
            alert('Please add at least one author for the confernece.');
            return;
        }
        editConference({
            _id: conference._id,
            title: title,
            name: conferenceName,
            summary : conferenceSummary,
            country: conferenceCountry,
            city: conferenceCity,
            start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
            page_range: pageRange,
            authors: authors
        });

        resetFields()
        setOpen(false)
    };

    return (

        <Modal
            aria-labelledby="transition-modal-add-new-conference-record"
            aria-describedby="transition-modal-add-new-conference-record"
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
                                <Typography variant="h6">
                                    Conferences (Selected) Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="con-title"
                                    required
                                    fullWidth
                                    id="con-title"
                                    label="Conference Title"
                                    size='small'
                                    value={title}
                                    autoFocus
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="conference"
                                    required
                                    fullWidth
                                    id="conference"
                                    label="Conference Name"
                                    size='small'
                                    value={conferenceName}
                                    autoFocus
                                    onChange={e => setConferenceName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <CountrySelector country={conferenceCountry} setCountry={setConferenceCountry} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="conference-city"
                                    label="City "
                                    size='small'
                                    name="conference-city"
                                    autoComplete='off'
                                    value={conferenceCity}
                                    onChange={e => setConferenceCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="conference-summary"
                                    label="Conference Summary"
                                    size='small'
                                    name="conference-summary"
                                    autoComplete='off'
                                    multiline
                                    rows={3}
                                    value={conferenceSummary}
                                    onChange={e => setConferenceSummary(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        <DatePicker value={startDate} label="Conference Date" size='small' format='LL' onChange={date => setStartDate(date)} />
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
                            <Typography variant='body1'>Authors</Typography>

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
                                            <Typography variant='body2'> {author.first_name}</Typography>
                                            <Typography sx={{ flexGrow: 1 }} variant='body2'>{author.last_name}</Typography>
                                            <Button variant='outlined' color='error' size='small' onClick={() => removeAuthor(author._id)}>Remove Author</Button>
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
                                    >
                                        Add
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
                                    flexGrow: 1
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
                                    flexGrow: 1
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