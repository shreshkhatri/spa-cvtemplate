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

export default function EditEditorialExperienceForm({
  open,
  setOpen,
  experience,
  editEditorialExperience,
}) {
  const [role, setRole] = useState(experience.role);
  const [association, setAssociation] = useState(experience.organization);
  const [associationCountry, setAssociationCountry] = useState(
    experience.country
  );
  const [associationCity, setAssociationCity] = useState(experience.city);
  const [startDate, setStartDate] = useState(dayjs(experience.start_date));
  const [endDate, setEndDate] = useState(dayjs(experience.end_date));
  const [isContinue, setIsContinue] = useState(experience.isContinue);
  const [description, setDescription] = useState(experience.description);

  //this use effect is necessary to work with all of the editorial experience data under edit mode
  useEffect(() => {
    // Update state variables with the properties from the experience object
    setRole(experience.role);
    setAssociation(experience.organization);
    setAssociationCountry(experience.country);
    setAssociationCity(experience.city);
    setStartDate(
      experience.start_date
        ? dayjs(experience.start_date)
        : experience.start_date
    );
    setEndDate(
      experience.end_date ? dayjs(experience.end_date) : experience.end_date
    );
    setIsContinue(experience.isContinue);
    setDescription(experience.description);
  }, [experience]);

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
    editEditorialExperience({
      _id: experience._id,
      role: role,
      organization: association,
      country: associationCountry,
      city: associationCity,
      start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
      end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
      isContinue: isContinue,
      description: description,
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
                <Typography variant="h5"> New Editorial Experience</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="editorial-role"
                  required
                  fullWidth
                  id="editorial-role"
                  label="Role / Designation"
                  size="small"
                  value={role}
                  autoFocus
                  onChange={(e) => setRole(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="editorial-organization"
                  label="Organization / Association / Journal / Conference"
                  size="small"
                  name="editorial-organization"
                  autoComplete="off"
                  value={association}
                  onChange={(e) => setAssociation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CountrySelector
                  country={associationCountry}
                  setCountry={setAssociationCountry}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="association-city"
                  label="City"
                  size="small"
                  name="association-city"
                  autoComplete="off"
                  value={associationCity}
                  onChange={(e) => setAssociationCity(e.target.value)}
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
                  <FormControlLabel
                    control={
                      <Switch
                        value={isContinue}
                        onChange={(e) => {
                          setIsContinue(e.target.checked);
                        }}
                      />
                    }
                    label="Currently Associated"
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
                  id="editorial-description"
                  label="Description / Responsibilities / Achievements"
                  size="small"
                  name="editorial-description"
                  autoComplete="off"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                gap: 1,
                padding: 1,
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
