import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsLinkedin } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineYoutube, AiFillGithub } from 'react-icons/ai';
import { BiLogoGitlab } from 'react-icons/bi';
import { DiBitbucket } from 'react-icons/di';


export default function BasicInformationSection({ basic_information,setEditBasicInfoMode }) {


  function capitalizeWords(str) {
    // Split the string into an array of words
    let words = str.split(" ");

    // Loop through each word and capitalize the first letter
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Join the capitalized words back into a string and return it
    return words.join(" ");
  }

  return <Box sx={{
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    width: '100%',
    paddingX: 5
  }}>

    {
      /* this will be uncommented later on 

    <Card variant="outlined">
      <CardContent>

      </CardContent>
      <CardActions>
        <Button color='inherit' variant="outlined" size="small">Upload Profile Picture</Button>
      </CardActions>
    </Card> 

    */
    }

    <Card sx={{ flexGrow: 1 }} variant="outlined">
      <CardContent>

        <Typography variant="h5" gutterBottom>
          {capitalizeWords(basic_information.first_name + ' ' + basic_information.last_name)}
        </Typography>


        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 5,
          rowGap: 1
        }}>
          <Typography variant="subtitle2" gutterBottom>
            <BsTelephone size={17} /> {basic_information.mobile_number}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <HiOutlineMail size={17} /> {basic_information.email}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <AiOutlineHome size={17} /> {basic_information.street + ', ' + basic_information.postal_zip_code + ', ' + basic_information.state_province_region} {basic_information.city + ', ' + basic_information.country.label}
          </Typography>
          

        </Box>
        <Typography>Media Information</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 5,
          rowGap: 1
        }}>
          <Typography variant="subtitle2" gutterBottom>
            <BsLinkedin size={17} /> {basic_information.linkedIn}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <AiFillGithub size={17} /> {basic_information.gitHub}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <DiBitbucket size={17} /> {basic_information.bitBucket}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <AiOutlineYoutube size={17} /> {basic_information.youTube}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <BiLogoGitlab size={17} /> {basic_information.gitLab}
          </Typography>

        </Box>
      </CardContent>
      <CardActions sx={{
        justifyContent: 'flex-end'
      }}>
        <Button color='inherit' variant="outlined" size="small" onClick={()=>setEditBasicInfoMode(true)}>Update Details</Button>
      </CardActions>
    </Card>
  </Box>

}
