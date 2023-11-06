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
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CountrySelector from '../../CountrySelector';
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

export default function EditMembershipForm({
  open,
  setOpen,
  membership,
  editMembership,
}) {
  const [organizationName, setOrganizationName] = useState(
    membership.organization
  );
  const [membershipType, setMembershipType] = useState(
    membership.membership_type
  );
  const [organizationCountry, setOrganizationCountry] = useState(
    membership.country
  );
  const [organizationCity, setOrganizationCity] = useState(membership.city);
  const [startDate, setStartDate] = useState(
    membership.start_date ? dayjs(membership.start_date) : membership.start_date
  );
  const [endDate, setEndDate] = useState(
    membership.end_date ? dayjs(membership.end_date) : membership.end_date
  );
  const [isContinue, setIsContinue] = useState(membership.isContinue);

  useEffect(() => {
    setOrganizationName(membership.organization);
    setMembershipType(membership.membership_type);
    setOrganizationCountry(membership.country);
    setOrganizationCity(membership.city);
    setStartDate(
      membership.start_date
        ? dayjs(membership.start_date)
        : membership.start_date
    );
    setEndDate(
      membership.end_date ? dayjs(membership.end_date) : membership.end_date
    );
    setIsContinue(membership.isContinue);
  }, [membership]);

  function resetFields() {
    setOrganizationName('');
    setMembershipType('');
    setStartDate(null);
    setEndDate(null);
    setIsContinue(false);
    setOrganizationCountry(null);
    setOrganizationCity('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    editMembership({
      _id: membership._id,
      organization: organizationName,
      membership_type: membershipType,
      country: organizationCountry,
      city: organizationCity,
      start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
      end_date: endDate ? endDate.format('YYYY-MM-DD') : null,
      isContinue: isContinue,
    });

    resetFields();
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-add-new-membership-record"
      aria-describedby="transition-modal-add-new-membership-record"
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
                <Typography variant="h6" sx={{color:'black'}}>Membership Information</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="organization-name"
                  required
                  fullWidth
                  id="organization-name"
                  label="Organization Name"
                  size="small"
                  value={organizationName}
                  autoFocus
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="membership-type"
                  required
                  fullWidth
                  id="membership-type"
                  label="Membership Type / Role"
                  size="small"
                  value={membershipType}
                  autoFocus
                  onChange={(e) => setMembershipType(e.target.value)}
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
                  id="council-city"
                  label="City"
                  size="small"
                  name="council-city"
                  autoComplete="off"
                  value={organizationCity}
                  onChange={(e) => setOrganizationCity(e.target.value)}
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
                        onChange={(e) => {
                          setIsContinue(e.target.checked);
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
