import { useState,useEffect } from 'react';
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
    boxShadow: 24,
    paddingY: 5,
    paddingX: 10,
};


export default function EditAwardHonorForm({ open, setOpen, award ,editAwardHonor }) {
    const [awardName, setAwardName] = useState(award.name);
    const [organization, setOrganization] = useState(award.awarding_body);
    const [awardDescription, setAwardDescription] = useState(award.description);
    const [awardDate, setAwardDate] = useState(dayjs(award.award_date));

    
    useEffect(() => {
        setAwardName(award.name);
        setOrganization(award.awarding_body);
        setAwardDescription(award.description);
        setAwardDate(dayjs(award.award_date));
    }, [award]);
    

    function resetFields() {
        setAwardName('')
        setOrganization('')
        setAwardDate(null)
        setAwardDescription('')
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        editAwardHonor({
            award_honor_ID: award.award_honor_ID,
            name: awardName,
            awarding_body: organization,
            award_date: awardDate ? awardDate.format('YYYY-MM-DD') : null,
            description: awardDescription,
        })

        resetFields()
        setOpen(false)
    };

    return (
        <Modal
            aria-labelledby="transition-modal-add-award-record"
            aria-describedby="transition-modal-add-award-record"
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
                        ...style
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Typography variant='h6'>Award Details</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='off'
                                    name="award-name"
                                    required
                                    fullWidth
                                    id="award-name"
                                    label="Award / Honor"
                                    size='small'
                                    value={awardName}
                                    onChange={e => setAwardName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='off'
                                    name="awarding-body"
                                    required
                                    fullWidth
                                    id="awarding-body"
                                    label="Awarding Body"
                                    size='small'
                                    value={organization}
                                    onChange={e => setOrganization(e.target.value)}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={awardDate} label="Award Date" size='small' format='LL' onChange={date => setAwardDate(date)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='off'
                                    name="awarding-description"
                                    fullWidth
                                    id="awarding-description"
                                    label="Awarding Description"
                                    size='small'
                                    value={awardDescription}
                                    multiline
                                    minRows={6}
                                    onChange={e => setAwardDescription(e.target.value)}
                                />
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