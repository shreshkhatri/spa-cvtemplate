'use client';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import styles from './page.module.css'
import Box from '@mui/material/Box';
import ResponsiveAppBar from '@/components/TopMenuBar'
import BasicInformationSection from '@/components/BasicInformationSection';
import CVSectionButtons from '@/components/CVSectionButtons';
import { CVDATA } from '../assets/cvdata'
import WorkExperienceTimeLine from '@/components/WorkExperienceTimeLine';
import PublicationsTimeLine from '@/components/PublicationsTimeLine';
import PersonalStatement from '@/components/PersonalStatement';
import CareerSummary from '@/components/CareerSummary';
import EducationTimeLine from '@/components/EducationTimeLine';
import BasicInformationForm from '@/components/forms/BasicInformationForm';
import PersonalStatementForm from '@/components/forms/PersonalStatemenForm';
import CareerSummaryForm from '@/components/forms/CareerSummaryForm';
import NewWorkExperienceForm from '@/components/forms/NewWorkExperienceForm';
import NewPublicationForm from '@/components/forms/NewPublicationForm';
import _ from 'lodash';
import ProjectsTimeline from '@/components/ProjectsTimeLine';
import NewProjectForm from '@/components/forms/NewProjectForm';
import NewEducationDegreeForm from '@/components/forms/NewEducationDegreeForm';

export default function Home() {
  const [cvdata, updateCVData] = useState(CVDATA)
  const [isBasicInfoEditModeOn, setEditBasicInfoMode] = useState(false);
  const [isPersonalStatementEditModeOn, setIsPersonalStatementEditModeOn] = useState(false);
  const [isCareerSummaryEditMode, setIsCareerSummaryEditMode] = useState(false);

  // function to update Career summary
  function updateCareerSummary(updatedCareerSummary) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      career_summary: updatedCareerSummary
    }));

  }

  // function to update Personal Statement
  function updatePersonalStatement(updatedStatement) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      personal_statement: updatedStatement
    }));

  }

  // function to update BasicInformation
  function updateBasicInformation(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      basic_information: updatedData
    }));

  }

  //function to add new publication to the exisiting list
  function addNewPublication(newPublicationData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      publications: [newPublicationData, ...prevCVData.publications]
    }));
  }

  //function to add new work experience
  function addNewWorkExperience(newWorkExperience) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      work_history: [newWorkExperience, ...prevCVData.work_history]
    }));
  }


  //function to add new project Information
  function addNewProject(newProjectDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      projects: [newProjectDetails, ...prevCVData.projects]
    }));
  }

  //function to add new degree Information
  function addNewDegree(newDegreeDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      education_history: [newDegreeDetails, ...prevCVData.education_history]
    }));
  }

  // function to delete personal statement
  function deletePersonalStatement() {
    const { personal_statement, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  // function to delete career summary
  function deleteCareerSummary() {
    const { career_summary, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  // function to delete education history
  function deleteEducationHistory() {
    const { education_history, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  // function to delete work history
  function deleteWorkHistory() {
    const { work_history, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  // function to delete Publications
  function deletePublications() {
    const { publications, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  // function to delete Projects Section
  function deleteProjects() {
    const { projects, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  return (
    <Box>
      <ResponsiveAppBar />
      <main className={styles.main}>
        <Typography variant="h6" gutterBottom>  Profile Information </Typography>

        {!isBasicInfoEditModeOn && <BasicInformationSection basic_information={cvdata.basic_information} setEditBasicInfoMode={setEditBasicInfoMode} />}

        {isBasicInfoEditModeOn && <BasicInformationForm basic_information={cvdata.basic_information} updateBasicInformation={updateBasicInformation} setEditBasicInfoMode={setEditBasicInfoMode} />}

        {cvdata.hasOwnProperty('personal_statement') && !isPersonalStatementEditModeOn && <PersonalStatement personal_statement={cvdata.personal_statement} deletePersonalStatement={deletePersonalStatement} setIsPersonalStatementEditModeOn={setIsPersonalStatementEditModeOn} />}
        {cvdata.hasOwnProperty('personal_statement') && isPersonalStatementEditModeOn && <PersonalStatementForm personal_statement={cvdata.personal_statement} updatePersonalStatement={updatePersonalStatement} setIsPersonalStatementEditModeOn={setIsPersonalStatementEditModeOn} />}

        {cvdata.hasOwnProperty('career_summary') && !isCareerSummaryEditMode && <CareerSummary career_summary={cvdata.career_summary} deleteCareerSummary={deleteCareerSummary} setIsCareerSummaryEditMode={setIsCareerSummaryEditMode} />}
        {cvdata.hasOwnProperty('career_summary') && isCareerSummaryEditMode && <CareerSummaryForm career_summary={cvdata.career_summary} updateCareerSummary={updateCareerSummary} setIsCareerSummaryEditMode={setIsCareerSummaryEditMode} />}

        {cvdata.hasOwnProperty('education_history') && <><NewEducationDegreeForm addNewDegree={addNewDegree} /><EducationTimeLine education_history={cvdata.education_history} deleteEducationHistory={deleteEducationHistory} /></>}
        
        {cvdata.hasOwnProperty('work_history') && <> <NewWorkExperienceForm addNewWorkExperience={addNewWorkExperience} />
          <WorkExperienceTimeLine work_history={cvdata.work_history} deleteWorkHistory={deleteWorkHistory} /></>}

        {cvdata.hasOwnProperty('projects') && <> <NewProjectForm addNewProject={addNewProject} /> <ProjectsTimeline projects={cvdata.projects} deleteProjects={deleteProjects} /></>}

        {cvdata.hasOwnProperty('publications') && <><NewPublicationForm addNewPublication={addNewPublication} /><PublicationsTimeLine publications={cvdata.publications} deletePublications={deletePublications} /></>}
        <CVSectionButtons cvdata={cvdata} updateCVData={updateCVData} />


      </main>
    </Box>
  )
}

