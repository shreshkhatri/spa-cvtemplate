import { useState, useEffect } from 'react';
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
  boxShadow: 24,
};

export default function EditAccreditionExperienceForm({
  open,
  setOpen,
  accreditation,
  editAccreditionExperience,
}) {
  const [role, setRole] = useState(accreditation.role);
  const [organization, setOrganization] = useState(accreditation.organization);
  const [organizationCountry, setOrganizationCountry] = useState(
    accreditation.country
  );
  const [organizationCity, setOrganizationCity] = useState(accreditation.city);
  const [endDate, setEndDate] = useState(
    accreditation.end_date
      ? dayjs(accreditation.end_date)
      : accreditation.end_date
  );
  const [isContinue, setIsContinue] = useState(accreditation.isContinue);
  const [startDate, setStartDate] = useState(
    accreditation.start_date
      ? dayjs(accreditation.start_date)
      : accreditation.start_date
  );
  const [description, setDescription] = useState(accreditation.description);

  // useeffect to work with all accreditation data under edit mode
  useEffect(() => {
    if (accreditation) {
      setRole(accreditation.role);
      setOrganization(accreditation.organization);
      setOrganizationCountry(accreditation.country);
      setOrganizationCity(accreditation.city);
      setStartDate(
        accreditation.start_date
          ? dayjs(accreditation.start_date)
          : accreditation.start_date
      );
      setEndDate(
        accreditation.end_date
          ? dayjs(accreditation.end_date)
          : accreditation.end_date
      );
      setIsContinue(accreditation.isContinue);
      setDescription(accreditation.description);
    }
  }, [accreditation]);

  function resetFields() {
    setRole('');
    setOrganization('');
    setOrganizationCountry(null);
    setOrganizationCity('');
    setStartDate(null);
    setEndDate(null);
    setDescription('');
    setIsContinue(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    editAccreditionExperience({
      _id: accreditation._id,
      role,
      organization,
      country: organizationCountry,
      city: organizationCity,
      start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
      end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
      isContinue: isContinue,
      description,
    });
    resetFields();
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-add-new-accredition-record"
      aria-describedby="transition-modal-add-new-accredition-record"
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
                <Typography variant="h5"> Accreditation Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="accreditation-role"
                  required
                  fullWidth
                  id="accreditation-role"
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
                  id="acc-organization"
                  label="Organization"
                  size="small"
                  name="acc--organization"
                  autoComplete="off"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CountrySelector
                  country={organizationCountry}
                  setCountry={setOrganizationCountry}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="org-city"
                  label="City"
                  size="small"
                  name="org-city"
                  autoComplete="off"
                  value={organizationCity}
                  onChange={(e) => setOrganizationCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      required
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
                  id="acc-description"
                  label="Description / Responsibilities / Achievements"
                  size="small"
                  name="acc-description"
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
