import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { BsTelephone, BsLinkedin } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineHome, AiOutlineYoutube, AiFillGithub } from 'react-icons/ai';
import { BiSolidCity, BiLogoGitlab } from 'react-icons/bi';
import { SiGooglescholar, SiScopus } from 'react-icons/si';
import { LiaOrcid } from 'react-icons/lia';
import { DiBitbucket } from 'react-icons/di';
import CountrySelector from '../CountrySelector';
import TitleSelector from '../TitleSelector';

export default function BasicInformationForm({
  userData,
  basic_information,
  updateBasicInformation,
  setEditBasicInfoMode,
}) {
  const [title, setTitle] = useState(basic_information.title);
  const [firstName, setFirstName] = useState(
    basic_information.first_name
      ? basic_information.first_name
      : userData.first_name
  );
  const [lastName, setLastName] = useState(
    basic_information.last_name
      ? basic_information.last_name
      : userData.last_name
  );
  const [tagline, setTagline] = useState(basic_information.tagline);
  const [isProfilePictureSet, setIsProfilePictureSet] = useState(
    basic_information.isProfilePictureSet
  );
  const [url, setURL] = useState(basic_information.url);
  const [mobileNumber, setMobileNumber] = useState(
    basic_information.mobile_number
  );
  const [email, setEmail] = useState(
    basic_information.email ? basic_information.email : userData.email
  );
  const [street, setStreet] = useState(basic_information.street);
  const [city, setCity] = useState(basic_information.city);
  const [state, setState] = useState(basic_information.state_province_region);
  const [postCode, setPostCode] = useState(basic_information.postal_zip_code);
  const [country, setCountry] = useState(basic_information.country);
  const [linkedIn, setLinkedIn] = useState(basic_information.linkedIn);
  const [gitHub, setGitHub] = useState(basic_information.gitHub);
  const [bitBucket, setBitBucket] = useState(basic_information.bitBucket);
  const [youTube, setYouTube] = useState(basic_information.youTube);
  const [gitLab, setGitLab] = useState(basic_information.gitLab);

  const [scopusLink, setScopusLink] = useState(basic_information.scopusLink);
  const [googleScholarLink, setGoogleScholarLink] = useState(
    basic_information.googleScholarLink
  );
  const [orcidLink, setOrcidLink] = useState(basic_information.orcidLink);

  console.log(title);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBasicInformation({
      title,
      first_name: firstName,
      last_name: lastName,
      tagline,
      isProfilePictureSet,
      url,
      mobile_number: mobileNumber,
      email,
      street,
      city,
      state_province_region: state,
      postal_zip_code: postCode,
      country,
      linkedIn,
      gitHub,
      bitBucket,
      youTube,
      gitLab,
      googleScholarLink,
      orcidLink,
      scopusLink,
    });
    setEditBasicInfoMode(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: '100%',
          gap: 2,
        }}
      >
        <TitleSelector title={title} setTitle={setTitle} />
        <TextField
          autoComplete="off"
          name="userFirstName"
          required
          fullWidth
          id="userFirstName"
          label="First Name"
          size="small"
          value={firstName}
          autoFocus
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          fullWidth
          id="userLastName"
          label="Last Name"
          size="small"
          name="userLastName"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>
      <TextField
        id="tagline"
        label="Tagline / Current Designation / Highlights"
        size="small"
        name="tagline"
        autoComplete="off"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        fullWidth
      />
      <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
        Contact Information
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: 'inherit',
          flexWrap: 'wrap',
          columnGap: 2,
          rowGap: 1,
          paddingY: 2,
        }}
      >
        <TextField
          id="mobile-number"
          label="Mobile phone Number"
          size="small"
          name="mobile-number"
          autoComplete="off"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsTelephone />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="user-email"
          label="Email"
          size="small"
          name="user-email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HiOutlineMail />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />
      </Box>

      <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
        Address Information
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: 'inherit',
          flexWrap: 'wrap',
          columnGap: 2,
          rowGap: 1,
          paddingY: 2,
        }}
      >
        <TextField
          name="street-name"
          label="House No. / Street "
          size="small"
          id="street-name"
          autoComplete="off"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AiOutlineHome />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="city-name"
          label="City"
          size="small"
          id="city-name"
          autoComplete="off"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiSolidCity />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />

        <TextField
          name="post-code"
          label="Zip / Post Code"
          size="small"
          id="post-code"
          autoComplete="off"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          sx={{
            flexGrow: 1,
          }}
        />

        <TextField
          name="state-name"
          label="State / Province"
          size="small"
          id="state-name"
          autoComplete="off"
          value={state}
          onChange={(e) => setState(e.target.value)}
          sx={{
            flexGrow: 1,
          }}
        />
        <CountrySelector country={country} setCountry={setCountry} />
      </Box>

      <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
        Media Information
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: 'inherit',
          flexWrap: 'wrap',
          columnGap: 2,
          rowGap: 1,
          paddingY: 2,
        }}
      >
        <TextField
          name="linkedIn"
          label="LinkedIn"
          size="small"
          id="linkedIn"
          autoComplete="off"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsLinkedin />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />
        <TextField
          name="googleScholarLink"
          label="Google Scholar Profile"
          size="small"
          id="googleScholarLink"
          autoComplete="off"
          value={googleScholarLink}
          onChange={(e) => setGoogleScholarLink(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SiGooglescholar />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />
        <TextField
          name="scopusLink"
          label="Scopus Profile"
          size="small"
          id="scopusLink"
          autoComplete="off"
          value={scopusLink}
          onChange={(e) => setScopusLink(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SiScopus />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />
        <TextField
          name="orcidLink"
          label="ORCID profile"
          size="small"
          id="orcidLink"
          autoComplete="off"
          value={orcidLink}
          onChange={(e) => setOrcidLink(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LiaOrcid />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />
        <TextField
          name="gitHub"
          label="GitHub"
          size="small"
          id="gitHub"
          autoComplete="off"
          value={gitHub}
          onChange={(e) => setGitHub(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AiFillGithub />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />

        <TextField
          name="bitBucket"
          label="BitBucket"
          size="small"
          id="bitBucket"
          autoComplete="off"
          value={bitBucket}
          onChange={(e) => setBitBucket(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DiBitbucket />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />

        <TextField
          name="youTube"
          label="YouTube"
          size="small"
          id="youTube"
          autoComplete="off"
          value={youTube}
          onChange={(e) => setYouTube(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AiOutlineYoutube />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />

        <TextField
          name="gitLab"
          label="GitLab"
          size="small"
          id="gitLab"
          autoComplete="off"
          value={gitLab}
          onChange={(e) => setGitLab(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLogoGitlab />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() => setEditBasicInfoMode(false)}
          sx={{
            backgroundColor: 'error.main',
            padding: 1,
            flexGrow: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            backgroundColor: 'success.main',
            padding: 1,
            flexGrow: 1,
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
