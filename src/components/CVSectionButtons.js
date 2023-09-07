"use client";
import { Box } from '@mui/material';
import Button from '@mui/material/Button';


export default function CVSectionButtons({cvdata}) {
  

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      columnGap: 5,
      rowGap:1,
      justifyContent:'center',
      padding:2
    }}>

     { !cvdata.hasOwnProperty('personal_statement') && <Button color="inherit" variant="outlined" size="small">Add Personal Statement</Button>} 


     { !cvdata.hasOwnProperty('career_summary') && <Button color="inherit" variant="outlined" size="small">Add Career Summary</Button>}


     { !cvdata.hasOwnProperty('education_history') && <Button color="inherit" variant="outlined" size="small">Add Education</Button>}


     { !cvdata.hasOwnProperty('work_history') && <Button color="inherit" variant="outlined" size="small">Add Work Experience </Button>}


     { !cvdata.hasOwnProperty('publications') && <Button color="inherit" variant="outlined" size="small">Add Publications</Button>}


     { !cvdata.hasOwnProperty('languages') && <Button color="inherit" variant="outlined" size="small">Add Languages</Button>}
 
     { !cvdata.hasOwnProperty('certifications') && <Button color="inherit" variant="outlined" size="small">Add Training and Certifications</Button>}


    </Box>
  );
}
