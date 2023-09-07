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


export default function NewEducationDegreeForm({ addNewDegree }) {
    const institutionRef = useRef('');
    const degreeRef = useRef('');
    const [institutionCountry,setInstitutionCountry] = useState(null);
    const institutionCityRef = useRef('');
    const [startDate,setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isContinue, setIsContinue] = useState(false);
    const degreeGradeRef = useRef('');
    const courseSummaryRef = useRef('');
    const [closeAccordion,setCloseAccordion] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewDegree({
            degreeID: uniqid(),
            institution: institutionRef.current,
            degree: degreeRef.current,
            country: institutionCountry,
            city : institutionCityRef.current,
            start_date: JSON.stringify(startDate).substring(1,11),
            end_date: JSON.stringify(endDate).substring(1,11),
            isContinue: isContinue,
            grade : degreeGradeRef.current,
            course_summary: courseSummaryRef.current
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
                    Add Degree
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
                                    name="institution-name"
                                    required
                                    fullWidth
                                    id="institution-name"
                                    label="Institution Name"
                                    size='small'
                                    ref={institutionRef}
                                    autoFocus
                                    onChange={e => institutionRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="degree-name"
                                    required
                                    fullWidth
                                    id="degree-name"
                                    label="Degree"
                                    size='small'
                                    ref={degreeRef}
                                    autoFocus
                                    onChange={e => degreeRef.current = e.target.value}
                                />
                            </Grid>
                        
                            <Grid item xs={12} sm={6} >
                            <CountrySelector country={institutionCountry} setCountry={setInstitutionCountry} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="institution-city"
                                    label="City "
                                    size='small'
                                    name="institution-city"
                                    autoComplete='off'
                                    ref={institutionCityRef}
                                    onChange={e => institutionCityRef.current = e.target.value}
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
                                        />} label='Ongoing course' />
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
                                    id="degree-grade"
                                    label="Degree grade / remarks"
                                    size='small'
                                    name="degree_grade"
                                    autoComplete='off'
                                    ref={degreeGradeRef}
                                    onChange={e => degreeGradeRef.current = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="course-summary"
                                    label="Course Summary"
                                    size='small'
                                    name="course-summary"
                                    autoComplete='off'
                                    multiline
                                    rows={6}
                                    ref={courseSummaryRef}
                                    onChange={e => courseSummaryRef.current = e.target.value}
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