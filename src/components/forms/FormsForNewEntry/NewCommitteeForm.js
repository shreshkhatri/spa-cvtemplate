import { useState } from 'react';
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
  boxShadow: 24,
};

export default function NewCommitteeForm({ open, setOpen, addNewCommittee }) {
  const [committeeName, setCommitteeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [committeeCountry, setCommitteeCountry] = useState(null);
  const [committeeCity, setCommitteeCity] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isContinue, setIsContinue] = useState(false);

  function resetFields() {
    setCommitteeName('');
    setDesignation('');
    setCommitteeCountry(null);
    setCommitteeCity('');
    setStartDate(null);
    setEndDate(null);
    setIsContinue(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewCommittee({
      name: committeeName,
      designation: designation,
      country: committeeCountry,
      city: committeeCity,
      start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
      end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
      isContinue: isContinue,
    });

    resetFields();
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-add-new-committee-record"
      aria-describedby="transition-modal-add-new-committee-record"
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
            paddingY: {
              xs: 1,
              sm: 5,
            },
            paddingX: {
              xs: 1,
              sm: 10,
            },
            ...style,
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{color:'black'}}>
                  {' '}
                  Committees Association Details
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="committee-name"
                  required
                  fullWidth
                  id="committee-name"
                  label="Committee Name"
                  size="small"
                  value={committeeName}
                  onChange={(e) => setCommitteeName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="committee-designation"
                  required
                  fullWidth
                  id="committee-designation"
                  label="Committee Designation"
                  size="small"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CountrySelector
                  country={committeeCountry}
                  setCountry={setCommitteeCountry}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="committee-city"
                  label="City"
                  size="small"
                  name="committee-city"
                  autoComplete="off"
                  value={committeeCity}
                  onChange={(e) => setCommitteeCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={startDate}
                      label="Start Date"
                      size="small"
                      format="LL"
                      onChange={(date) => setStartDate(date)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel sx={{color:'black'}}
                    control={
                      <Switch
                        value={isContinue}
                        onChange={() => {
                          setIsContinue(!isContinue);
                        }}
                      />
                    }
                    label="Currently associated"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      disabled={isContinue}
                      value={endDate}
                      label="End Date"
                      size="small"
                      format="LL"
                      onChange={(date) => setEndDate(date)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                paddingTop: 1,
                gap: 1,
              }}
            >
              <Button
                fullWidth
                size="small"
                variant="contained"
                sx={{
                  textTransform:'none',
                  backgroundColor: 'error.main',
                  padding: 1,
                  flexGrow: 1,
                }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                sx={{
                  textTransform:'none',
                  backgroundColor: 'success.main',
                  padding: 1,
                  flexGrow: 1,
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
