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
import uniqid from 'uniqid';
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

export default function NewEditorialExperienceForm({ open, setOpen, addNewEditorialExperience }) {
    const [role, setRole] = useState('');
    const [association, setAssociation] = useState('');
    const [associationCountry, setAssociationCountry] = useState(null);
    const [associationCity, setAssociationCity] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isContinue, setIsContinue] = useState(false);
    const [description, setDescription] = useState('');

    function resetFields() {
        setRole('');
        setAssociation('');
        setAssociationCountry(null);
        setAssociationCity('');
        setStartDate(null);
        setEndDate(null);
        setIsContinue(false);
        setDescription('');
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        addNewEditorialExperience({
            experienceID: uniqid(),
            role: role,
            association: association,
            country: associationCountry,
            city: associationCity,
            start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
            end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
            isContinue: isContinue,
            description: description
        });

        resetFields();
        setOpen(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-add-new-editorial-experience-record"
            aria-describedby="transition-modal-add-new-editorial-record"
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
                                <Typography variant='h5'> New Editorial Experience</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='off'
                                    name="editorial-role"
                                    required
                                    fullWidth
                                    id="editorial-role"
                                    label="Role / Designation"
                                    size='small'
                                    value={role}
                                    autoFocus
                                    onChange={e => setRole(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="editorial-organization"
                                    label="Organization / Association / Journal / Conference"
                                    size='small'
                                    name="editorial-organization"
                                    autoComplete='off'
                                    value={association}
                                    onChange={e => setAssociation(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CountrySelector country={associationCountry} setCountry={setAssociationCountry} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="association-city"
                                    label="City"
                                    size='small'
                                    name="association-city"
                                    autoComplete='off'
                                    value={associationCity}
                                    onChange={e => setAssociationCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={startDate} label="Start Date" size='small' format='LL' onChange={date => setStartDate(date)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch
                                        value={isContinue}
                                        onChange={(e) => {
                                            setIsContinue(e.target.checked);
                                        }}
                                    />} label='Currently Associated' />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker disabled={isContinue} value={endDate} label="End Date" size='small' format='LL' onChange={date => setEndDate(date)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="editorial-description"
                                    label="Description / Responsibilities / Achievements"
                                    size='small'
                                    name="editorial-description"
                                    autoComplete='off'
                                    multiline
                                    rows={3}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </Grid>


                        </Grid>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                sm: 'row'
                            },
                            gap: 1,
                            padding: 1
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