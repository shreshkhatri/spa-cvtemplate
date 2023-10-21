import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsLinkedin } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineYoutube, AiFillGithub } from 'react-icons/ai';
import { BiLogoGitlab } from 'react-icons/bi';
import { SiGooglescholar, SiScopus } from 'react-icons/si';
import { LiaOrcid } from 'react-icons/lia';
import { DiBitbucket } from 'react-icons/di';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { capitalizeWords } from '@/assets/utilityFunctions';
import { IconButton, Tooltip } from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Avatar from '@mui/material/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import { ENDPOINT } from '@/data/endpoints';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const validateFileExtension = (file) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileName = file.name;
  const extension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
  return allowedExtensions.includes('.' + extension.toLowerCase());
};







export default function BasicInformationSection({
  userData,
  basic_information,
  setEditBasicInfoMode,
  uploadProfilePicture
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [uploadSuccessful,setUploadSuccessful] = useState(false);
  const [latestUploadedImage,setLatestUploadedImage] = useState(null)


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file)
    
    if (file) {
      if (validateFileExtension(file)) {
        // You can send the file to your server for upload here.
        // You may use libraries like axios for making HTTP requests.
        // Example: axios.post('/upload', file)
        
        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append('image', file);

        const response = await uploadProfilePicture(formData)
        console.log(response)
        if (response.severity==='success'){
          const reader = new FileReader();

          reader.onload = (e) => {
            // Set the selected image to the base64 data URL
            setLatestUploadedImage(e.target.result);
          };
  
          reader.readAsDataURL(file);
          setUploadSuccessful(true)
        }else{
          setUploadSuccessful(false)
          setLatestUploadedImage(null)
        }


      } else {
        alert('Invalid file type. Only image files with .jpg, .jpeg or .png extensions are allowed.');
      }
    }
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        width: '100%',
      }}
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => setIsMouseOver(false)}
    >

      <Card sx={{ flexGrow: 1 }} variant="outlined">
        <CardContent>
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Tooltip
              sx={{
                padding: 0,
                margin: 0,
                visibility: isMouseOver ? 'visible' : 'hidden',
              }}
              title="Update Personal Information"
            >
              <IconButton onClick={() => setEditBasicInfoMode(true)}>
                <EditNoteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm:'column',
              md:'row'
            },
            rowGap: 1,
            columnGap: 2,
            justifyContent:'center',
            alignItems: 'center',
          }}>
            <Box sx={{
              width:{
              xs:'50%',
              sm:'50%',
              md:'30%',
              lg:'15%'
              },
             
              }}>
              <Card>
                <CardContent >
                  {
                    (!_.isEmpty(basic_information.url) || (uploadSuccessful && latestUploadedImage)) && <Avatar
                    alt={`Profile picture ${basic_information.first_name || userData.first_name } ${basic_information.last_name || userData.last_name}`}
                    src={(uploadSuccessful && latestUploadedImage)?latestUploadedImage:`${ENDPOINT.PROFILE_PICTURE_LINK}/${basic_information.url}`}
                    sx={{ width: '100%' ,height:'auto'}}
                  />
                  }
                  {(_.isEmpty(basic_information.url) && (!uploadSuccessful && !latestUploadedImage)) && <AccountCircleIcon sx={{ width: '100%' ,height:'auto'}} />}
                  
                </CardContent>
                <CardActions sx={{justifyContent:'center'}}>
                  <Button size="small" component="label" variant="contained" startIcon={<AddAPhotoIcon />} sx={{ textTransform: 'none' }}>
                    Upload picture
                    <VisuallyHiddenInput type="file"  accept=".jpg, .jpeg, .png" onChange={handleFileUpload}/>
                  </Button>
                </CardActions>
              </Card>
            </Box>
            <Box sx={{ flexGrow: {
              sm:1
            } }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                {capitalizeWords(
                  `${basic_information.title ? basic_information.title + ' ' : ''
                  } ${basic_information.first_name
                    ? basic_information.first_name
                    : userData.first_name
                  } ${basic_information.last_name
                    ? basic_information.last_name
                    : userData.last_name
                  }`
                )}
              </Typography>

              {basic_information.tagline && (
                <Typography variant="h6" gutterBottom>
                  {basic_information.tagline}
                </Typography>
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 5,
                  rowGap: 1,
                }}
              >
                {basic_information.mobile_number && (
                  <Typography variant="subtitle2" gutterBottom>
                    <BsTelephone size={17} /> {basic_information.mobile_number}
                  </Typography>
                )}
                {basic_information.email && (
                  <Typography variant="subtitle2" gutterBottom>
                    <HiOutlineMail size={17} /> {basic_information.email}
                  </Typography>
                )}
                {(basic_information.street ||
                  basic_information.postal_zip_code ||
                  basic_information.state_province_region ||
                  basic_information.city ||
                  basic_information.basic_information) && (
                    <Typography variant="subtitle2" gutterBottom>
                      <AiOutlineHome size={17} />{' '}
                      {basic_information.street
                        ? capitalizeWords(basic_information.street)
                        : ''}
                      {!basic_information.postal_zip_code
                        ? ' '
                        : ' , ' + basic_information.postal_zip_code.toUpperCase()}
                      {!basic_information.state_province_region
                        ? ' '
                        : ' , ' +
                        capitalizeWords(basic_information.state_province_region)}
                      {!basic_information.city
                        ? ' '
                        : ' , ' + capitalizeWords(basic_information.city)}
                      {!basic_information.country
                        ? ''
                        : ' , ' + basic_information.country.label}
                    </Typography>
                  )}
              </Box>

              {(basic_information.orcidLink ||
                basic_information.linkedIn ||
                basic_information.gitHub ||
                basic_information.gitHub ||
                basic_information.bitBucket ||
                basic_information.youTube ||
                basic_information.gitLab ||
                basic_information.scopusLink ||
                basic_information.googleScholarLink) && (
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', paddingY: 2 }}
                  >
                    Media Information
                  </Typography>
                )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 5,
                  rowGap: 1,
                }}
              >
                {basic_information.linkedIn && (
                  <Typography variant="subtitle2" gutterBottom>
                    <BsLinkedin /> {basic_information.linkedIn}
                  </Typography>
                )}

                {basic_information.googleScholarLink && (
                  <Typography variant="subtitle2" gutterBottom>
                    <SiGooglescholar /> {basic_information.googleScholarLink}
                  </Typography>
                )}

                {basic_information.orcidLink && (
                  <Typography variant="subtitle2" gutterBottom>
                    <LiaOrcid /> {basic_information.orcidLink}
                  </Typography>
                )}

                {basic_information.scopusLink && (
                  <Typography variant="subtitle2" gutterBottom>
                    <SiScopus /> {basic_information.scopusLink}
                  </Typography>
                )}

                {basic_information.gitHub && (
                  <Typography variant="subtitle2" gutterBottom>
                    <AiFillGithub size={17} /> {basic_information.gitHub}
                  </Typography>
                )}

                {basic_information.bitBucket && (
                  <Typography variant="subtitle2" gutterBottom>
                    <DiBitbucket size={17} /> {basic_information.bitBucket}
                  </Typography>
                )}

                {basic_information.youTube && (
                  <Typography variant="subtitle2" gutterBottom>
                    <AiOutlineYoutube size={17} /> {basic_information.youTube}
                  </Typography>
                )}

                {basic_information.gitLab && (
                  <Typography variant="subtitle2" gutterBottom>
                    <BiLogoGitlab size={17} /> {basic_information.gitLab}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}
