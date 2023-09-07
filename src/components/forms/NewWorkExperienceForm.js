import { useRef, useState } from 'react';
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
import uniqid from 'uniqid';

export default function NewWorkExperienceForm({ addNewWorkExperience }) {
    const positionDesignationRef = useRef('');
    const employerRef = useRef('');
    const [employerCountry,setEmployerCountry] = useState(null);
    const employerCityRef = useRef('');
    const [startDate,setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isContinue, setIsContinue] = useState(false);
    const dutiesResponsibilitiesRef = useRef([]);
    const achievementsRef = useRef('');
    const [closeAccordion,setCloseAccordion] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewWorkExperience({
            employmentID: uniqid(),
            position_designation: positionDesignationRef.current,
            employer: employerRef.current,
            country : employerCountry,
            city : employerCityRef.current,
            start_date: JSON.stringify(startDate).substring(1,11),
            end_date: JSON.stringify(endDate).substring(1,11),
            isContinue: isContinue,
            duties_responsibilities: dutiesResponsibilitiesRef.current,
            achievements: achievementsRef.current
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

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="position-designation"
                                    required
                                    fullWidth
                                    id="position-designation"
                                    label="Designation"
                                    size='small'
                                    ref={positionDesignationRef}
                                    autoFocus
                                    onChange={e => positionDesignationRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="employer"
                                    label="Employer"
                                    size='small'
                                    name="employer"
                                    autoComplete='off'
                                    ref={employerRef}
                                    onChange={e => employerRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <CountrySelector country={employerCountry} setCountry={setEmployerCountry} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="employer-city"
                                    label="City "
                                    size='small'
                                    name="employer-city"
                                    autoComplete='off'
                                    ref={employerCityRef}
                                    onChange={e => employerCityRef.current = e.target.value}
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
                                        />} label='Currently work here' />
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
                                    id="duties-responsibilities"
                                    label="Duties & Responsibilities"
                                    size='small'
                                    name="duties-responsibilities"
                                    autoComplete='off'
                                    multiline
                                    rows={6}
                                    ref={dutiesResponsibilitiesRef}
                                    onChange={e => dutiesResponsibilitiesRef.current = e.target.value}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="achievements"
                                    label="Achievements"
                                    size='small'
                                    name="achievements"
                                    autoComplete='off'
                                    multiline
                                    rows={6}
                                    ref={achievementsRef}
                                    onChange={e => achievementsRef.current = e.target.value}
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