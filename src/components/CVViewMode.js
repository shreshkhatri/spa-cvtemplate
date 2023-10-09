'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import BasicInformationSection from './ViewModeComponents/BasicInformationSection';
import WorkExperienceTimeLine from './ViewModeComponents/WorkExperienceTimeLine';
import PublicationsTimeLine from './ViewModeComponents/PublicationsTimeLine';
import PersonalStatement from './ViewModeComponents/PersonalStatement';
import CareerSummary from './ViewModeComponents/CareerSummary';
import EducationTimeLine from './ViewModeComponents/EducationTimeLine';
import _ from 'lodash';
import ProjectsTimeline from './ViewModeComponents/ProjectsTimeLine';
import CouncilTimeLine from './ViewModeComponents/CouncilTimeLine';
import CommitteeTimeLine from './ViewModeComponents/CommitteeTimeLine';
import MembershipTimeLine from './ViewModeComponents/MembershipTimeLine';
import AwardHonorsTimeLine from './ViewModeComponents/AwardHonorsTimeLine';
import ConferencesList from './ViewModeComponents/ConferencesList';
import JournalsList from './ViewModeComponents/JournalsList';
import TechnicalSkillsList from './ViewModeComponents/TechnicalSkillsList';
import AccreditationsTimeLine from './ViewModeComponents/AccreditationsTimeLine';
import EditorialExperienceTimeLine from './ViewModeComponents/EditorialExperienceTimeLine';
import QuickLiinks from './ViewModeComponents/QuickLiinks';
import FloatingButton from './FloatingButton';
import AppTheme from '@/assets/AppTheme';
import { downloadCV } from '@/assets/cvDownloadScript';

export default function CVViewMode({cvdata}) {
    
    //function for calling a function for converting document into pdf format
    const saveCVObject = () => {
        downloadCV(cvdata)
    };



    return (<AppTheme>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    paddingX: {
                        xs: 1,
                        sm: 5,
                        md: 10
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingTop: 2,
                        width: '100%'
                    }}>
                        <Button size='small' variant='contained' onClick={saveCVObject}>Download CV</Button>
                    </Box>

                    <Box id='cv-content' sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: 2,
                        width: '100%',
                    }}>
                        <BasicInformationSection basic_information={cvdata.basic_information} />
                        {!_.isNull(cvdata) && <QuickLiinks targets={Object.keys(cvdata)} />}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 2,
                            width: '100%',
                        }}>

                            {!_.isNull(cvdata) &&
                                Object.keys(cvdata).map((key) => {

                                    switch (key) {
                                        case 'personal_statement':
                                            return (
                                                <Box key={key} >
                                                    <PersonalStatement personal_statement={cvdata.personal_statement} />
                                                </Box>
                                            )
                                        case 'career_summary':
                                            return (
                                                <Box key={key} >
                                                    <CareerSummary career_summary={cvdata.career_summary} />
                                                </Box>
                                            )
                                        case 'education_history':
                                            return (

                                                <Box key={key}>
                                                    <EducationTimeLine education_history={cvdata.education_history} />
                                                </Box>
                                            )
                                        case 'work_history':

                                            return (
                                                <Box key={key} >
                                                    <WorkExperienceTimeLine work_history={cvdata.work_history}/>
                                                </Box>
                                            )
                                        case 'accreditations_experience':

                                            return (
                                                <Box key={key} >
                                                    <AccreditationsTimeLine accreditations_experience={cvdata.accreditations_experience}  />
                                                </Box>

                                            )
                                        case 'projects':

                                            return (
                                                <Box key={key} >
                                                    <ProjectsTimeline projects={cvdata.projects}  />
                                                </Box>

                                            )
                                        case 'technical_skills':

                                            return (

                                                <Box key={key} >
                                                    <TechnicalSkillsList technical_skills={cvdata.technical_skills}/>
                                                </Box>


                                            )
                                        case 'editorial_experience':
                                            return (
                                                <Box key={key} >
                                                    <EditorialExperienceTimeLine editorial_experience={cvdata.editorial_experience}/>
                                                </Box>

                                            )
                                        case 'publications':

                                            return (
                                                <Box key={key} >
                                                    <PublicationsTimeLine publications={cvdata.publications}/>
                                                </Box>
                                            )
                                        case 'committees':

                                            return (
                                                <Box key={key} >
                                                    <CommitteeTimeLine committees={cvdata.committees} />
                                                </Box>

                                            )
                                        case 'councils':

                                            return (

                                                <Box key={key}>
                                                    <CouncilTimeLine councils={cvdata.councils}/>
                                                </Box>
                                            )
                                        case 'memberships':

                                            return (

                                                <Box key={key} >
                                                    <MembershipTimeLine memberships={cvdata.memberships} />
                                                </Box>

                                            )
                                        case 'awards_honors':

                                            return (
                                                <Box key={key} >
                                                    <AwardHonorsTimeLine awards_honors={cvdata.awards_honors}/>
                                                </Box>

                                            )
                                        case 'conferences':
                                            return (
                                                <Box key={key} >
                                                    <ConferencesList conferences={cvdata.conferences} />
                                                </Box>

                                            )
                                        case 'journals':
                                            return (
                                                <Box key={key} >
                                                    <JournalsList journals={cvdata.journals}/>
                                                </Box>

                                            )
                                        default:
                                            return null
                                    }
                                })

                            }

                        </Box>

                    </Box>
                    <FloatingButton />
                </Box>
            </Box>
        </AppTheme>)
}

