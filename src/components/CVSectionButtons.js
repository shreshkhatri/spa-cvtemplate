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
              case 'personal_statement':
                return <Button key={index} sx={{ backgroundColor: 'secondary.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addPersonalStatement()} on>Add Personal Statement</Button>
              case 'career_summary':
                return <Button sx={{ backgroundColor: 'error.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addCareerSummary()}>Add Career Summary</Button>
              case 'education_history':
                return <Button sx={{ backgroundColor: 'warning.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addEducationHistory()}>Add Education</Button>
              case 'work_history':
                return <Button sx={{ backgroundColor: 'info.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addWorkHistory()}>Add Work Experience </Button>
              case 'projects':
                return <Button sx={{ backgroundColor: 'success.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addProjects()}>Add Projects </Button>
              case 'publications':
                return <Button sx={{ backgroundColor: 'text.primary', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addPublications()}>Add Publications</Button>
              case 'technical_skills':
                return <Button sx={{ backgroundColor: 'text.secondary', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addTechnicalSkillsSection()}>Add Technical Skills</Button>
              case 'editorial_experience':
                return <Button sx={{ backgroundColor: 'warning.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addNewEditorialExperienceSection()}>Add Editorial Experience</Button>
              case 'committees':
                return <Button sx={{ backgroundColor: 'error.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addCommitteeSection()}>Add Committee</Button>
              case 'councils':
                return <Button sx={{ backgroundColor: 'secondary.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addCouncilsSection()}>Add Councils</Button>
              case 'memberships':
                return <Button sx={{ backgroundColor: 'warning.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addMembershipsSection()}>Add Memberships</Button>
              case 'awards_honors':
                return <Button sx={{ backgroundColor: 'error.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addAwardSection()}>Add Awards / Honors</Button>
              case 'conferences':
                return <Button sx={{ backgroundColor: 'text.primary', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addConferencesSection()}>Add Conferences</Button>
              case 'journals':
                return <Button sx={{ backgroundColor: 'info.main', flexGrow: 1, padding: 1 }} variant="contained" size="small" onClick={() => CVMenuButtonHandlers.addJournalsSection()}>Add Journals</Button>
              default:
                return null
            }
          })
        }
      </Box>
    </>
  );
}
