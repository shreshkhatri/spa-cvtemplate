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
import { FormGroup, FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CountrySelector from '../CountrySelector';


export default function NewProjectForm({ addNewProject }) {
    const projectTitleRef = useRef('');
    const designationRef =  useRef('');
    const [projectCountry,setProjectCountry] = useState(null);
    const projectCityRef = useRef('');
    const [startDate,setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isContinue, setIsContinue] = useState(false);
    const descriptionRef = useRef('');
    const [closeAccordion,setCloseAccordion] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewProject({
            projectID: uniqid(),
            project_title: projectTitleRef.current,
            designation: designationRef.current,
            country:projectCountry,
            city:projectCityRef.current,
            start_date: JSON.stringify(startDate).substring(1,11),
            end_date: JSON.stringify(endDate).substring(1,11),
            isContinue: isContinue,
            description: descriptionRef.current
        })
    };

    return (

        <Accordion expanded={closeAccordion} onChange={()=>setCloseAccordion(!closeAccordion)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">
                    Add Project
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

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="position-title"
                                    required
                                    fullWidth
                                    id="project-title"
                                    label="Project Title"
                                    size='small'
                                    ref={projectTitleRef}
                                    autoFocus
                                    onChange={e => projectTitleRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="position-designation"
                                    required
                                    fullWidth
                                    id="project-designation"
                                    label="Designation"
                                    size='small'
                                    ref={designationRef}
                                    autoFocus
                                    onChange={e => designationRef.current = e.target.value}
                                />
                            </Grid>
                        
                            <Grid item xs={12} sm={6} >
                            <CountrySelector country={projectCountry} setCountry={setProjectCountry} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="project-city"
                                    label="City "
                                    size='small'
                                    name="project-city"
                                    autoComplete='off'
                                    ref={projectCityRef}
                                    onChange={e => projectCityRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={startDate} label="Start Date" size='small' format='LL' onChange={date => setStartDate(date)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} >
                                <FormGroup>
                                    <FormControlLabel control={<Switch 
                                    value={isContinue} 
                                    onChange={() => {
                                        setIsContinue(!isContinue);
                                        }} 
                                        />} label='On going Project' />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6} >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker disabled={isContinue} value={endDate} label="End Date" size='small' format='LL' onChange={date => setEndDate(date)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="project-description"
                                    label="Project Description"
                                    size='small'
                                    name="project-description"
                                    autoComplete='off'
                                    multiline
                                    rows={6}
                                    ref={descriptionRef}
                                    onChange={e => descriptionRef.current = e.target.value}
                                />
                            </Grid>

                        </Grid>

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
                                onClick={()=>setCloseAccordion(false)}
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
                                Add
                            </Button>
                        </Box>


                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>


    );
}