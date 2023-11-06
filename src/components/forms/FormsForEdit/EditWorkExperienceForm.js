import { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import _ from 'lodash';

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

export default function EditWorkExperienceForm({
  open,
  setOpen,
  work_experience,
  editWorkExperience,
}) {
  const [positionDesignation, setPositionDesignation] = useState(
    work_experience.position_designation
  );
  const [employer, setEmployer] = useState(work_experience.employer);
  const [employerCountry, setEmployerCountry] = useState(
    work_experience.country
  );
  const [employerCity, setEmployerCity] = useState(work_experience.city);
  const [startDate, setStartDate] = useState(dayjs(work_experience.start_date));
  const [endDate, setEndDate] = useState(dayjs(work_experience.end_date));
  const [isContinue, setIsContinue] = useState(work_experience.isContinue);
  const [dutiesResponsibilities, setDutiesResponsibilities] = useState(
    work_experience.duties_responsibilities
  );
  const [achievements, setAchievements] = useState(
    work_experience.achievements
  );

  //useeffect should be used so that the change is reflected to the UI when the data is changed or updated
  useEffect(() => {
    setPositionDesignation(work_experience.position_designation);
    setEmployer(work_experience.employer);
    setEmployerCity(work_experience.city);
    setStartDate(
      work_experience.start_date
        ? dayjs(work_experience.start_date)
        : work_experience.start_date
    );
    setEndDate(
      work_experience.end_date
        ? dayjs(work_experience.end_date)
        : work_experience.end_date
    );
    setEmployerCountry(work_experience.country);
    setIsContinue(work_experience.isContinue);
    setDutiesResponsibilities(work_experience.duties_responsibilities);
    setAchievements(work_experience.achievements);
  }, [work_experience]);

  function resetFields() {
    setPositionDesignation();
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

    editWorkExperience({
      _id: work_experience._id,
      position_designation: positionDesignation,
      employer: employer,
      country: employerCountry,
      city: employerCity,
      start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
      end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
      isContinue: isContinue,
      duties_responsibilities: dutiesResponsibilities,
      achievements: achievements,
    });
    resetFields();
    setOpen(false);
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
                <Typography sx={{color:'black'}} variant="h5"> Experience Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="position-designation"
                  required
                  fullWidth
                  id="position-designation"
                  label="Designation"
                  size="small"
                  value={positionDesignation}
                  autoFocus
                  onChange={(e) => setPositionDesignation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="employer"
                  label="Employer"
                  size="small"
                  name="employer"
                  autoComplete="off"
                  value={employer}
                  onChange={(e) => setEmployer(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CountrySelector
                  country={employerCountry}
                  setCountry={setEmployerCountry}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="employer-city"
                  label="City "
                  size="small"
                  name="employer-city"
                  autoComplete="off"
                  value={employerCity}
                  onChange={(e) => setEmployerCity(e.target.value)}
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
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel sx={{color:'black'}}
                    control={
                      <Switch
                        value={isContinue}
                        onChange={(e) => {
                          setIsContinue(e.target.checked);
                        }}
                      />
                    }
                    label="Currently work here"
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="duties-responsibilities"
                  label="Duties & Responsibilities"
                  size="small"
                  name="duties-responsibilities"
                  autoComplete="off"
                  multiline
                  rows={3}
                  value={dutiesResponsibilities}
                  onChange={(e) => setDutiesResponsibilities(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="achievements"
                  label="Achievements"
                  size="small"
                  name="achievements"
                  autoComplete="off"
                  multiline
                  rows={3}
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                padding: 1,
                gap: 1,
              }}
            >
              <Button
                fullWidth
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: 'error.main',
                  padding: 1,
                  flexGrow: 1,
                  textTransform:'none',
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
                  backgroundColor: 'success.main',
                  padding: 1,
                  flexGrow: 1,
                  textTransform:'none',
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
