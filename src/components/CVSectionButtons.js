"use client";
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { CV_SECTIONS } from '@/data/data';
import _ from 'lodash'


export default function CVSectionButtons({ keys, CVMenuButtonHandlers }) {

  const keysToAdd = _.difference(CV_SECTIONS, keys)

  return (
    <>
      {!_.isEmpty(keysToAdd) && <Typography variant='h5' align='center'> Add Sections</Typography>}

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 1,
        rowGap: 1,
        justifyContent: 'center',
        padding: 2,
        fontWeight: 'bold',
        width: '100%'
      }}>
        {
          keysToAdd.map((key, index) => {
            switch (key) {
              case 'basic_information':
                return <Button key={index} sx={{ textTransform:'none',backgroundColor: 'warning.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addBasicInformation()} >Add Basic Information</Button>
              case 'personal_statement':
                return <Button key={index} sx={{ textTransform:'none',backgroundColor: 'secondary.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addPersonalStatement()} >Add Personal Statement</Button>
              case 'career_summary':
                return <Button key={index} sx={{ textTransform:'none',backgroundColor: 'error.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addCareerSummary()}>Add Career Summary</Button>
              case 'education_history':
                return <Button key={index} sx={{ textTransform:'none',backgroundColor: 'warning.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addEducationHistory()}>Add Education</Button>
              case 'work_history':
                return <Button key={index} sx={{ textTransform:'none',backgroundColor: 'info.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addWorkHistory()}>Add Work Experience </Button>
              case 'projects':
                return <Button key={index} sx={{ textTransform:'none',backgroundColor: 'success.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addProjects()}>Add Projects </Button>
              case 'publications':
                return <Button key={index}  sx={{ textTransform:'none', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addPublications()}>Add Publications</Button>
              case 'technical_skills':
                return <Button key={index}  sx={{ textTransform:'none',backgroundColor: 'text.secondary', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addTechnicalSkillsSection()}>Add Technical Skills</Button>
              case 'editorial_experience':
                return <Button key={index}  sx={{ textTransform:'none',backgroundColor: 'warning.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addNewEditorialExperienceSection()}>Add Editorial Experience</Button>
              case 'committees':
                return <Button key={index}  sx={{ textTransform:'none',backgroundColor: 'error.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addCommitteeSection()}>Add Committee</Button>
              case 'councils':
                return <Button key={index}  sx={{ textTransform:'none',backgroundColor: 'secondary.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addCouncilsSection()}>Add Councils</Button>
              case 'memberships':
                return <Button key={index}  sx={{ textTransform:'none',backgroundColor: 'warning.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addMembershipsSection()}>Add Memberships</Button>
              case 'awards_honors':
                return <Button key={index}  sx={{ textTransform:'none',backgroundColor: 'error.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addAwardSection()}>Add Awards / Honors</Button>
              case 'conferences':
                return <Button key={index}  sx={{ textTransform:'none', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addConferencesSection()}>Add Conferences</Button>
              case 'journals':
                return <Button key={index}  sx={{ textTransform:'none',backgroundColor: 'info.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addJournalsSection()}>Add Journals</Button>
                case 'accreditations_experience':
                  return <Button key={index} sx={{ textTransform:'none',backgroundColor: 'success.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addAccreditionsSection()}>Add Accreditation Experience </Button>
              default:
                return null
            }
          })
        }
      </Box>
    </>
  );
}
