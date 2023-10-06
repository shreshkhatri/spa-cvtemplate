import {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsLinkedin } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineYoutube, AiFillGithub } from 'react-icons/ai';
import { BiLogoGitlab } from 'react-icons/bi';
import { DiBitbucket } from 'react-icons/di';
import _ from 'lodash';
import { capitalizeWords } from '@/assets/utilityFunctions';
import { IconButton, Tooltip } from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export default function BasicInformationSection({ basic_information, setEditBasicInfoMode }) {

  const [isMouseOver, setIsMouseOver] = useState(false);


  return <Box sx={{
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    width: '100%'
  }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>

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

    <Card sx={{ flexGrow: 1 }} variant="outlined" >
      <CardContent >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
          <Tooltip sx={{padding:0,margin:0, visibility:isMouseOver?'visible':'hidden'}} title='Update Personal Information'>
            <IconButton  onClick={() => setEditBasicInfoMode(true)} >
              <EditNoteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          {capitalizeWords(basic_information.first_name + ' ' + basic_information.last_name)}
        </Typography>

        {
          !_.isEmpty(basic_information.tagline) &&
          <Typography variant="h6" gutterBottom>
            {basic_information.tagline}
          </Typography>
        }



        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 5,
          rowGap: 1
        }}>
          {
            !_.isEmpty(basic_information.mobile_number) && <Typography variant="subtitle2" gutterBottom>
              <BsTelephone size={17} /> {basic_information.mobile_number}
            </Typography>
          }
          {
            !_.isEmpty(basic_information.email) && <Typography variant="subtitle2" gutterBottom>
              <HiOutlineMail size={17} /> {basic_information.email}
            </Typography>
          }
          {
            (!_.isEmpty(basic_information.street) ||
              !_.isEmpty(basic_information.postal_zip_code) ||
              !_.isEmpty(basic_information.state_province_region) ||
              !_.isEmpty(basic_information.city) ||
              !_.isEmpty(basic_information.basic_information))
            &&
            <Typography variant="subtitle2" gutterBottom>
              <AiOutlineHome size={17} />  {capitalizeWords(basic_information.street)}
              {_.isEmpty(basic_information.postal_zip_code) ? ' ' : ' , ' + basic_information.postal_zip_code.toUpperCase()}
              {_.isEmpty(basic_information.state_province_region) ? ' ' : ' , ' + capitalizeWords(basic_information.state_province_region)}
              {_.isEmpty(basic_information.city) ? ' ' : ' , ' + capitalizeWords(basic_information.city)}
              {!basic_information.country ? '[ country]' : ' , ' + basic_information.country.label}
            </Typography>
          }



        </Box>
        <Typography variant='body1' sx={{ fontWeight: 'bold', padding: 2 }}>Media Information</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 5,
          rowGap: 1
        }}>
          {
            !_.isEmpty(basic_information.linkedIn) &&
            <Typography variant="subtitle2" gutterBottom>
              <BsLinkedin /> {basic_information.linkedIn}
            </Typography>
          }

          {
            !_.isEmpty(basic_information.gitHub) &&
            <Typography variant="subtitle2" gutterBottom>
              <AiFillGithub size={17} /> {basic_information.gitHub}
            </Typography>
          }

          {
            !_.isEmpty(basic_information.bitBucket) &&
            <Typography variant="subtitle2" gutterBottom>
              <DiBitbucket size={17} /> {basic_information.bitBucket}
            </Typography>

          }

          {
            !_.isEmpty(basic_information.youTube) &&
            <Typography variant="subtitle2" gutterBottom>
              <AiOutlineYoutube size={17} /> {basic_information.youTube}
            </Typography>
          }

          {
            !_.isEmpty(basic_information.gitLab) &&
            <Typography variant="subtitle2" gutterBottom>
              <BiLogoGitlab size={17} /> {basic_information.gitLab}
            </Typography>
          }

        </Box>
      </CardContent>
    </Card>
  </Box>

}
