import { useRef, useState } from 'react';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function NewPublicationForm({ addNewPublication }) {
    const titleRef = useRef('');
    const [authors, updateAuthors] = useState([]);
    const publicationDateRef = useRef(null);
    const publicationEventRef = useRef('');
    const publicationVenueRef = useRef('');
    const DOIRef = useRef(null);
    const editionVolumeRef = useRef('');
    const abstractRef = useRef([]);
    const publicationURLRef = useRef('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [closeAccordion, setCloseAccordion] = useState(false);

    // a function to remove the author from the list
    function removeAuthor(authorID) {
        const tempAuthList = authors.filter(author => author.id != authorID)
        updateAuthors(tempAuthList);
    }

    // a function to add the author to the list of authors
    function addAuthor() {
        if (firstName.trim().length != 0 && lastName.trim().length != 0) {
            updateAuthors(prevList => ([...prevList, { id: uniqid(), first_name: firstName, last_name: lastName }]))
            setFirstName('');
            setLastName('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewPublication({
            publicationID: uniqid(),
            title: titleRef.current,
            authors: authors,
            publication_date: JSON.stringify(publicationDateRef.current).substring(1, 11),
            publication_event: publicationEventRef.current,
            publication_venue: publicationVenueRef.current,
            DOI: JSON.stringify(DOIRef.current).substring(1, 11),
            edition_volume: editionVolumeRef.current,
            abstract: 'this is predefined summary can be changed later on',
            publication_url: publicationURLRef.current
        })
    };

    return (
        <Accordion expanded={closeAccordion} onChange={() => setCloseAccordion(!closeAccordion)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">
                    Add Work Experience
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 'inherit'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add Publication
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="publicationTitle"
                                    required
                                    fullWidth
                                    id="publicationTitle"
                                    label="Publication Title"
                                    size='small'
                                    ref={titleRef}
                                    autoFocus
                                    onChange={e => titleRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="publication_event"
                                    label="Publication Event / Conference"
                                    size='small'
                                    name="publication_event"
                                    autoComplete='off'
                                    ref={publicationEventRef}
                                    onChange={e => publicationEventRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="publication_venue"
                                    label="Event Venue / Location"
                                    size='small'
                                    name="publication_venue"
                                    autoComplete='off'
                                    ref={publicationVenueRef}
                                    onChange={e => publicationVenueRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker format='LL' ref={DOIRef} label="Date of Issue (DOI)" size='small' onChange={date => DOIRef.current = date} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker format='LL' ref={publicationDateRef} label="Date of Publication" size='small' onChange={date => publicationDateRef.current = date} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="edition_volume"
                                    label="Edition / vol. "
                                    size='small'
                                    name="edition_volume"
                                    autoComplete='off'
                                    ref={editionVolumeRef}
                                    onChange={e => editionVolumeRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="publication_url"
                                    label="Publication URL"
                                    size='small'
                                    id="publication_url"
                                    autoComplete='off'
                                    ref={publicationURLRef}
                                    onChange={e => publicationURLRef.current = e.target.value}

                                />
                            </Grid>

                        </Grid>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 2
                        }}>
                            <Typography>Authors</Typography>

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
                                        }} key={author.id}>
                                            <Typography variant='h6'> {author.first_name}</Typography>
                                            <Typography sx={{ flexGrow: 1 }} variant='h6'>{author.last_name}</Typography>
                                            <Button variant='outlined' onClick={() => removeAuthor(author.id)}>Remove</Button>
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
                                        required
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
                                        required
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
                            gap: 1
                        }}>
                            <Button
                                fullWidth
                                size='small'
                                variant="outlined"
                                color='inherit'
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                size='small'
                                color='success'
                                variant='outlined'
                            >
                                Save
                            </Button>
                        </Box>


                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>


    );
}