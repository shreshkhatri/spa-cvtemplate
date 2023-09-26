import {  useState , useEffect} from 'react';
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

export default function EditCouncilForm({ open, setOpen, council, editCouncil }) {
    const [name, setCouncilName] = useState(council.name);
    const [designation, setDesignation] = useState('');
    const [councilCountry, setCouncilCountry] = useState(council.country);
    const [councilCity, setCouncilCity] = useState(council.city);
    const [startDate, setStartDate] = useState(dayjs(council.start_date));
    const [endDate, setEndDate] = useState(dayjs(council.end_date));
    const [isContinue, setIsContinue] = useState(council.isContinue);


    //so that the form updates its state and UI with the change in data
    useEffect(() => {
        setCouncilName(council.name);
        setDesignation(council.designation)
        setCouncilCountry(council.country);
        setCouncilCity(council.city);
        setStartDate(dayjs(council.start_date));
        setEndDate(dayjs(council.end_date));
        setIsContinue(council.isContinue);
      }, [council]);
      
    function resetFields() {
        setCouncilName('');
        setDesignation('')
        setCouncilCountry(null);
        setCouncilCity('');
        setStartDate(null);
        setEndDate(null);
        setIsContinue(false);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        editCouncil({
            councilID: council.councilID,
            name: name,
            designation:designation,
            country: councilCountry,
            city: councilCity,
            start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
            end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
            isContinue: isContinue
        });

        resetFields()
        setOpen(false)
    };

    return (

        <Modal
            aria-labelledby="transition-modal-add-new-council-record"
            aria-describedby="transition-modal-add-new-council-record"
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
                                <Typography variant='h5'> Council Association Information</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='off'
                                    name="council-name"
                                    required
                                    fullWidth
                                    id="council-name"
                                    label="Council Name"
                                    size='small'
                                    value={name}
                                    onChange={e => setCouncilName(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='off'
                                    name="council-designation"
                                    required
                                    fullWidth
                                    id="council-designation"
                                    label="Designation"
                                    size='small'
                                    value={designation}
                                    onChange={e => setDesignation(e.target.value)}
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <CountrySelector country={councilCountry} setCountry={setCouncilCountry} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="council-city"
                                    label="City"
                                    size='small'
                                    name="council-city"
                                    autoComplete='off'
                                    value={councilCity}
                                    onChange={e => setCouncilCity(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            value={startDate}
                                            label="Start Date"
                                            size='small'
                                            format='LL'
                                            onChange={date => setStartDate(date)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch
                                            value={isContinue}
                                            onChange={(e) => setIsContinue(e.target.checked)}
                                        />}
                                        label='Currently associated'
                                    />
                                </FormGroup>
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            disabled={isContinue}
                                            value={endDate}
                                            label="End Date"
                                            size='small'
                                            format='LL'
                                            onChange={date => setEndDate(date)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                        </Grid>

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