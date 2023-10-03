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
import CountrySelector from '../../CountrySelector';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

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

export default function NewWorkExperienceForm({ open, setOpen, addNewWorkExperience }) {

    const [positionDesignation, setPositionDesignation] = useState('');
    const [employer, setEmployer] = useState('');
    const [employerCountry, setEmployerCountry] = useState(null);
    const [employerCity, setEmployerCity] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isContinue, setIsContinue] = useState(false);
    const [dutiesResponsibilities, setDutiesResponsibilities] = useState('');
    const [achievements, setAchievements] = useState('');

    function resetFields() {
        setPositionDesignation('');
        setEmployer('');
        setEmployerCity('');
        setStartDate(null);
        setEndDate(null);
        setEmployerCountry(null);
        setIsContinue(false);
        setDutiesResponsibilities('');
        setAchievements('');

    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!employerCountry) {
            alert('Please select the country')
            return
        }
        if (!startDate) {
            alert('Please select the start date')
            return
        }

        if (!isContinue && !endDate) {
            alert('Please select the end date')
            return
        }
        addNewWorkExperience({
            position_designation: positionDesignation,
            employer: employer,
            country: employerCountry,
            city: employerCity,
            start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
            end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
            isContinue: isContinue,
            duties_responsibilities: dutiesResponsibilities,
            achievements: achievements,
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

                    <Box component="form" onSubmit={handleSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Typography variant='h5'> Experience Details</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='off'
                                    name="position-designation"
                                    required
                                    fullWidth
                                    id="position-designation"
                                    label="Designation"
                                    size='small'
                                    value={positionDesignation}
                                    autoFocus
                                    onChange={e => setPositionDesignation(e.target.value)}
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
                                    value={employer}
                                    onChange={e => setEmployer(e.target.value)}
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
                                    value={employerCity}
                                    onChange={e => setEmployerCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} >
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
                                        onChange={(e) => {
                                            setIsContinue(e.target.checked);
                                        }}
                                    />} label='Currently work here' />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker disabled={isContinue} value={endDate} label="End Date" size='small' format='LL' onChange={date => setEndDate(date)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    
                                    fullWidth
                                    id="duties-responsibilities"
                                    label="Duties & Responsibilities"
                                    size='small'
                                    name="duties-responsibilities"
                                    autoComplete='off'
                                    multiline
                                    rows={3}
                                    value={dutiesResponsibilities}
                                    onChange={e => setDutiesResponsibilities(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    
                                    fullWidth
                                    id="achievements"
                                    label="Achievements"
                                    size='small'
                                    name="achievements"
                                    autoComplete='off'
                                    multiline
                                    rows={3}
                                    value={achievements}
                                    onChange={e => setAchievements(e.target.value)}
                                />
                            </Grid>

                        </Grid>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                sm: 'row'
                            },
                            padding: 1,
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