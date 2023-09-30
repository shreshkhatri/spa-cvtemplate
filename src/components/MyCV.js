'use client';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BasicInformationSection from '@/components/BasicInformationSection';
import CVSectionButtons from '@/components/CVSectionButtons';
import WorkExperienceTimeLine from '@/components/WorkExperienceTimeLine';
import PublicationsTimeLine from '@/components/PublicationsTimeLine';
import PersonalStatement from '@/components/PersonalStatement';
import CareerSummary from '@/components/CareerSummary';
import EducationTimeLine from '@/components/EducationTimeLine';
import BasicInformationForm from '@/components/forms/BasicInformationForm';
import PersonalStatementForm from '@/components/forms/PersonalStatemenForm';
import CareerSummaryForm from '@/components/forms/CareerSummaryForm';
import NewWorkExperienceForm from '@/components/forms/FormsForNewEntry/NewWorkExperienceForm';
import NewPublicationForm from '@/components/forms/FormsForNewEntry/NewPublicationForm';
import _ from 'lodash';
import ProjectsTimeline from '@/components/ProjectsTimeLine';
import NewProjectForm from '@/components/forms/FormsForNewEntry/NewProjectForm';
import NewCouncilForm from '@/components/forms/FormsForNewEntry/NewCouncilForm';
import CouncilTimeLine from '@/components/CouncilTimeLine';
import NewCommitteeForm from '@/components/forms/FormsForNewEntry/NewCommitteeForm';
import CommitteeTimeLine from '@/components/CommitteeTimeLine';
import NewMembershipForm from '@/components/forms/FormsForNewEntry/NewMembershipForm';
import MembershipTimeLine from '@/components/MembershipTimeLine';
import NewAwardHonorForm from '@/components/forms/FormsForNewEntry/NewAwardHonorForm';
import AwardHonorsTimeLine from '@/components/AwardHonorsTimeLine';
import ConferencesList from '@/components/ConferencesList';
import NewConferenceForm from '@/components/forms/FormsForNewEntry/NewConferenceForm';
import NewJournalForm from '@/components/forms/FormsForNewEntry/NewJournalForm';
import JournalsList from '@/components/JournalsList';
import TechnicalSkillsList from '@/components/TechnicalSkillsList';
import NewAccreditionExperienceForm from '@/components/forms/FormsForNewEntry/NewAccreditionExperienceForm';
import AccreditationsTimeLine from '@/components/AccreditationsTimeLine';
import NewEditorialExperienceForm from '@/components/forms/FormsForNewEntry/NewEditorialExperience';
import EditorialExperienceTimeLine from '@/components/EditorialExperienceTimeLine';
import NewEducationDegreeForm from '@/components/forms/FormsForNewEntry/NewEducationDegreeForm';
import EditEducationDegreeForm from '@/components/forms/FormsForEdit/EditEducationDegreeForm';
import EditWorkExperienceForm from '@/components/forms/FormsForEdit/EditWorkExperienceForm';
import EditProjectForm from '@/components/forms/FormsForEdit/EditProjectForm';
import EditPublicationForm from '@/components/forms/FormsForEdit/EditPublicationForm';
import EditEditorialExperienceForm from '@/components/forms/FormsForEdit/EditEditorialExperienceForm';
import EditCommitteeForm from '@/components/forms/FormsForEdit/EditCommitteeForm';
import EditCouncilForm from '@/components/forms/FormsForEdit/EditCouncilForm';
import EditMembershipForm from '@/components/forms/FormsForEdit/EditMembershipForm';
import EditAwardHonorForm from '@/components/forms/FormsForEdit/EditAwardHonorForm';
import EditConferenceForm from '@/components/forms/FormsForEdit/EditConferenceForm';
import EditJournalForm from '@/components/forms/FormsForEdit/EditJournalForm';
import QuickLiinks from '@/components/QuickLiinks';
import FloatingButton from '@/components/FloatingButton';
import LoadingUI from '@/components/LoadingUI';
import AppTheme from '@/assets/AppTheme';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { onDragEndHndler } from '@/assets/dndHandlers';
import { downloadCV } from '@/assets/cvDownloadScript';
import { DROPPABLE_TYPE_IDS, DROPPABLE_TYPES ,RESPONSE_SEVERITY} from '@/data/data';
import { ENDPOINT } from '@/data/endpoints';
import { API_CALLS } from '@/assets/apicalls';
import Toast from './Toast';


export default function MyCV() {
  const [cvdata, updateCVData] = useState({})
  const [isBasicInfoEditModeOn, setEditBasicInfoMode] = useState(false);
  const [isPersonalStatementEditModeOn, setIsPersonalStatementEditModeOn] = useState(false);
  const [isCareerSummaryEditMode, setIsCareerSummaryEditMode] = useState(false);

  //states for forms for entering new entry
  const [openNewEducationForm, setOpenNewEducationForm] = useState(false);
  const [openNewExperienceForm, setOpenNewExperienceForm] = useState(false);
  const [openNewAccreditionExperienceForm, setOpenNewAccreditionExperienceForm] = useState(false);
  const [openNewProjectForm, setOpenNewProjectForm] = useState(false);
  const [openNewTechnicalSkillForm, setOpenNewTechnicalSkillForm] = useState(false);
  const [openNewEditorialExperienceForm, setOpenNewEditorialExperienceForm] = useState(false);
  const [openNewPublicationForm, setOpenNewPublicationForm] = useState(false);
  const [openNewCommitteeForm, setOpenNewCommitteeForm] = useState(false);
  const [openNewCouncilForm, setOpenNewCouncilForm] = useState(false);
  const [openNewMembershipForm, setOpenNewMembershipForm] = useState(false);
  const [openNewAwardHonorForm, setOpenNewAwardHonorForm] = useState(false);
  const [openNewConferenceForm, setOpenNewConferenceForm] = useState(false);
  const [openNewJournalForm, setOpenNewJournalForm] = useState(false);

  // States for forms for modifying the existing entry
  const [openEditEducationForm, setOpenEditEducationForm] = useState(false);
  const [openEditExperienceForm, setOpenEditExperienceForm] = useState(false);
  const [openEditAccreditionExperienceForm, setOpenEditAccreditionExperienceForm] = useState(false);
  const [openEditProjectForm, setOpenEditProjectForm] = useState(false);
  const [openEditEditorialExperienceForm, setOpenEditEditorialExperienceForm] = useState(false);
  const [openEditPublicationForm, setOpenEditPublicationForm] = useState(false);
  const [openEditCommitteeForm, setOpenEditCommitteeForm] = useState(false);
  const [openEditCouncilForm, setOpenEditCouncilForm] = useState(false);
  const [openEditMembershipForm, setOpenEditMembershipForm] = useState(false);
  const [openEditAwardHonorForm, setOpenEditAwardHonorForm] = useState(false);
  const [openEditConferenceForm, setOpenEditConferenceForm] = useState(false);
  const [openEditJournalForm, setOpenEditJournalForm] = useState(false);
  const router = useRouter();
  const [pageLoading, setIsPageLoading] = useState(true)
  const [tempStore, setTempStore] = useState(null);
  const [toastPayLoad, setToastPayLoad] = useState({ show:true, severity:'success', message:''})

  useEffect(() => {
    
    async function fetchData() {
      await fetchCVData();
    }
    fetchData();
  }, []);

  //function for calling a function for converting document into pdf format
  const saveCVObject = () => {
    downloadCV(cvdata)
  };


  // function for getting CV data
  async function fetchCVData() {
    const authToken = localStorage.getItem('auth-token')
    fetch(ENDPOINT.GETCV, {
      method: "GET",
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'charset': 'UTF-8',
        'auth-token': authToken
      }
    }).then(async (response) => {
      var json = await response.json()
      return { status: response.status, ...json }
    })
      .then(response => {
        if (response.status == 200) {
          console.log(response.data)
          updateCVData(response.data)
          setIsPageLoading(false)
        }
        else {
          const { error } = response
          console.log(error)
          setIsPageLoading(false)
          router.push('/error')
        }
      })
      .catch(error => {
        console.log(error)
        setIsPageLoading(false)
        router.push('/error')
      });


  }
  /*************************************  FUNCTION FOR OPENING FORM FOR EDITING DATA  **************************************************/


  // function for setting the form up for editing journal details
  function openFormForJournalEdit(journalID) {

    setTempStore(cvdata.journals.find(journal => journal.journalID == journalID));
    setOpenEditJournalForm(true);
  }



  // function for setting the form up for editing conference details
  function openFormForConferenceEdit(conferenceID) {
    setTempStore(cvdata.conferences.find(conference => conference.conferenceID == conferenceID));
    setOpenEditConferenceForm(true);
  }


  // function for setting the form up for editing award and honor details
  function openFormForAwardHonorEdit(award_honor_ID) {
    setTempStore(cvdata.awards_honors.find(award => award.award_honor_ID == award_honor_ID));
    setOpenEditAwardHonorForm(true);
  }

  // function for setting the form up for editing membership details
  function openFormForMembershipEdit(membershipID) {
    setTempStore(cvdata.memberships.find(membership => membership.membershipID == membershipID));
    setOpenEditMembershipForm(true);
  }


  // function for setting the form up for editing council details
  function openFormForCouncilEdit(councilID) {
    setTempStore(cvdata.councils.find(council => council.councilID == councilID));
    setOpenEditCouncilForm(true);
  }

  // function for setting the form up for editing editorial experience
  function openFormForCommitteeEdit(committeeID) {
    setTempStore(cvdata.committees.find(committee => committee.committeeID == committeeID));
    setOpenEditCommitteeForm(true);
  }

  // function for setting the form up for editing editorial experience
  function openFormForEditorialExperienceEdit(experienceID) {
    setTempStore(cvdata.editorial_experience.find(experience => experience.experienceID == experienceID));
    setOpenEditEditorialExperienceForm(true);
  }



  // function for setting the form up for editing publication information 
  function openFormForPublicationEdit(publicationID) {
    setTempStore(cvdata.publications.find(publication => publication.publicationID == publicationID));
    setOpenEditPublicationForm(true);
  }


  // function for setting the form up for editing project information 
  function openFormForProjectEdit(projectID) {
    setTempStore(cvdata.projects.find(project => project.projectID == projectID));
    setOpenEditProjectForm(true);
  }


  // function for setting the form for editing degree information and loading the data into tempstorage
  function openFormForDegreeEdit(degreeID) {
    setTempStore(cvdata.education_history.find(degree => degree.degreeID == degreeID));
    setOpenEditEducationForm(true);
  }


  // function for opening th form for dediting employment details 
  function openFormForWorkExperienceEdit(employmentID) {
    setTempStore(cvdata.work_history.find(work_experience => work_experience.employmentID == employmentID));
    setOpenEditExperienceForm(true);
  }



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
  async function updateBasicInformation(updatedData) {
    const authToken = localStorage.getItem('auth-token')

    const response = await API_CALLS.updateSection(authToken,'basic_information',updatedData,'6516ee36eec80f04abf1faa3')
    console.log(response)

    if (response.severity === RESPONSE_SEVERITY.SUCCESS){
      updateCVData(prevCVData => ({
        ...prevCVData,
        basic_information: updatedData
      }));
    }
    setToastPayLoad({show:true,severity:response.severity,message:response.message})
  }


  /******************************************* FUNCTION FOR APPENDING NEW ITEMS TO THE LIST ************************************************ */

  //function to add new editorial experience to the exisiting list
  function addNewEditorialExperience(editorialExperienceDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      editorial_experience: [editorialExperienceDetails, ...prevCVData.editorial_experience]
    }));
  }


  //function to add new accreditation to the exisiting list
  function addNewAccreditionExperience(accreditationDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      accreditations: [accreditationDetails, ...prevCVData.accreditations]
    }));
  }


  //function to add new technical skill to the exisiting list
  function addNewTechnicalSkill(skillDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      technical_skills: [skillDetails, ...prevCVData.technical_skills]
    }));
  }

  //function to add new conference entry to the exisiting list
  function addNewJournal(journalDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      journals: [journalDetails, ...prevCVData.journals]
    }));
  }

  //function to add new conference entry to the exisiting list
  function addNewConference(conferenceDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      conferences: [conferenceDetails, ...prevCVData.conferences]
    }));
  }

  //function to add new award ifnromation to the exisiting list
  function addNewAwardHonor(awardDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      awards_honors: [awardDetails, ...prevCVData.awards_honors]
    }));
  }


  //function to add new membership details to the exisiting list
  function addNewMembership(membershipDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      memberships: [membershipDetails, ...prevCVData.memberships]
    }));
  }

  //function to add new committee to the exisiting list
  function addNewCommittee(newCommitteeDetails) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      committees: [newCommitteeDetails, ...prevCVData.committees]
    }));
  }

  //function to add new publication to the exisiting list
  function addNewCouncil(newCouncilData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      councils: [newCouncilData, ...prevCVData.councils]
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



  /********************************** FUNCTION FOR DELEING THE PROPERTY FROM THE OBJECT *************************************************** */

  // function to delete editorial experience property from the object
  function deleteEditorialExperienceSection() {
    const { editorial_experience, ...rest } = cvdata;
    updateCVData({ ...rest });
  }


  // function to delte accreditations property from the object
  function deleteAccreditationsSection() {
    const { accreditations, ...rest } = cvdata;
    updateCVData({ ...rest });
  }


  // function to delete technicalSkills property from the object
  function deleteTechnicallSection() {
    const { technical_skills, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  // function to delete journals property from the object
  function deleteJournalsSection() {
    const { journals, ...rest } = cvdata;
    updateCVData({ ...rest });
  }


  // function to delete conferences property from the object
  function deleteConferencesSection() {
    const { conferences, ...rest } = cvdata;
    updateCVData({ ...rest });
  }


  // function to delete awards property from the object
  function deleteAwardSection() {
    const { awards_honors, ...rest } = cvdata;
    updateCVData({ ...rest });
  }


  // function to delete memberships property from the object
  function deleteMembershipSection() {
    const { memberships, ...rest } = cvdata;
    updateCVData({ ...rest });
  }


  // function to delete committees property from the object
  function deleteCommitteeSection() {
    const { committees, ...rest } = cvdata;
    updateCVData({ ...rest });
  }

  // function to delete councils property from the object
  function deleteCouncilsSection() {
    const { councils, ...rest } = cvdata;
    updateCVData({ ...rest });
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


  /************************************* FUNCTION FOR ADDING PROPERTY BACK TO THE MAIN OBJECT ***********************************************/

  const CVMenuButtonHandlers = {

    //function for adding editorialExperience property to the list 
    addNewEditorialExperienceSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        editorial_experience: []
      }));
    },

    //function for adding accreditationsections property to the list 
    addAccreditionsSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        accreditations: []
      }));
    },


    //function for adding technical skills property to the list 
    addTechnicalSkillsSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        technical_skills: []
      }));
    },

    //function for adding journals property to the list 
    addJournalsSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        journals: []
      }));
    },

    //function for adding conferences property to the list 
    addConferencesSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        conferences: []
      }));
    },


    //function for adding awards property to the list 
    addAwardSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        awards_honors: []
      }));
    },

    //function for adding memberships property to the list 
    addMembershipsSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        memberships: []
      }));
    },


    //function for adding committee to the list 
    addCommitteeSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        committees: []
      }));
    },

    //function for adding councils object 
    addCouncilsSection: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        councils: []
      }));
    },

    //function for adding personal statement
    addPersonalStatement: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        personal_statement: 'Double tap or click to update ...'
      }));
    },

    // function to add career summary
    addCareerSummary: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        career_summary: 'Double tap or click to update ...'
      }));
    },


    // function to add education history
    addEducationHistory: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        education_history: []
      }));
    },


    // function to add work history section
    addWorkHistory: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        work_history: []
      }));
    },

    // function to add Publications
    addPublications: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        publications: []
      }));
    },

    // function to add  Projects Section
    addProjects: () => {
      updateCVData(prevCVData => ({
        ...prevCVData,
        projects: []
      }));
    }
  }

  /*************************************** FUNCTION TO EDIT INDIVIDUAL ITEMS FROM THE LIST *****************************************/

  //function to edit journal from  the existing list
  function editJournal(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      journals: prevCVData.journals.map(journal => journal.journalID == updatedData.journalID ? updatedData : journal)
    }));
    setTempStore(null);
  }


  //function to edit conference from  the existing list
  function editConference(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      conferences: prevCVData.conferences.map(conference => conference.conferenceID == updatedData.conferenceID ? updatedData : conference)
    }));
    setTempStore(null);
  }


  //function to edit awardHonor details from the existing list
  function editAwardHonor(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      awards_honors: prevCVData.awards_honors.map(award => award.award_honor_ID == updatedData.award_honor_ID ? updatedData : award)
    }));
    setTempStore(null);
  }


  //function to edit membership details from the existing list
  function editMembership(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      memberships: prevCVData.memberships.map(membership => membership.membershipID == updatedData.membershipID ? updatedData : membership)
    }));
    setTempStore(null);
  }


  //function to edit council details from the existing list
  function editCouncil(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      councils: prevCVData.councils.map(council => council.councilID == updatedData.councilID ? updatedData : council)
    }));
    setTempStore(null);
  }

  //function to edit committee details from the existing list
  function editCommittee(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      committees: prevCVData.committees.map(committee => committee.committeeID == updatedData.committeeID ? updatedData : committee)
    }));
    setTempStore(null);
  }


  //function to edit editorial experience from the existing list
  function editEditorialExperience(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      editorial_experience: prevCVData.editorial_experience.map(experience => experience.experienceID == updatedData.experienceID ? updatedData : experience)
    }));
    setTempStore(null);
  }



  //function to edit publication detail from the existing list
  function editPublication(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      publications: prevCVData.publications.map(publication => publication.publicationID == updatedData.publicationID ? updatedData : publication)
    }));
    setTempStore(null);
  }


  //function to edit project detail from the existing list
  function editProject(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      projects: prevCVData.projects.map(project => project.projectID == updatedData.projectID ? updatedData : project)
    }));
    setTempStore(null);
  }

  //function to edit education degree item from the exisiting list
  function editEducationDegree(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      education_history: prevCVData.education_history.map(degree => degree.degreeID == updatedData.degreeID ? updatedData : degree)
    }));
    setTempStore(null);
  }


  //function to edit work experience item from the exisiting list
  function editWorkExperience(updatedData) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      work_history: prevCVData.work_history.map(work_experience => work_experience.employmentID == updatedData.employmentID ? updatedData : work_experience)
    }));
    setTempStore(null);
  }

  /*************************************** FUNCTION TO DELETE INDIVIDUAL ITEMS FROM THE LIST ***************************************/

  //function to delete editorialExperience item from the exisiting list
  function deleteEditorialExperience(experienceID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      editorial_experience: prevCVData.editorial_experience.filter(experience => experience.experienceID !== experienceID)
    }));
  }

  //function to delete accreditation details from the exisiting list
  function deleteAccreditation(experienceID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      accreditations: prevCVData.accreditations.filter(accreditation => accreditation.experienceID !== experienceID)
    }));
  }


  //function to delete technical skills details from the exisiting list
  function deleteTechnicalSkill(skillID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      technical_skills: prevCVData.technical_skills.filter(skill => skill.skillID !== skillID)
    }));
  }

  //function to delete journal details from the exisiting list
  function deleteJournal(journalID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      journals: prevCVData.journals.filter(journal => journal.journalID !== journalID)
    }));
  }

  //function to delete conference details from the exisiting list
  function deleteConference(conferenceID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      conferences: prevCVData.conferences.filter(conference => conference.conferenceID !== conferenceID)
    }));
  }

  //function to delete award details from the exisiting list
  function deleteAward(award_honor_ID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      awards_honors: prevCVData.awards_honors.filter(award => award.award_honor_ID !== award_honor_ID)
    }));
  }

  //function to delete membership details from the exisiting list
  function deleteMembership(membershipID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      memberships: prevCVData.memberships.filter(membership => membership.membershipID !== membershipID)
    }));
  }

  //function to delete committee from the exisiting list
  function deleteCommittee(committeeID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      committees: prevCVData.committees.filter(committee => committee.committeeID !== committeeID)
    }));
  }

  //function to delete council from the exisiting list
  function deleteCouncil(councilID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      councils: prevCVData.councils.filter(council => council.councilID !== councilID)
    }));
  }

  //function to delete publication from the exisiting list
  function deletePublication(publicationID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      publications: prevCVData.publications.filter(publication => publication.publicationID !== publicationID)
    }));
  }

  //function to delete existing work experience
  function deleteWorkExperience(employmentID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      work_history: prevCVData.work_history.filter(experience => experience.employmentID !== employmentID)
    }));
  }


  //function to delete project from the list
  function deleteProject(projectID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      projects: prevCVData.projects.filter(project => project.projectID !== projectID)
    }));
  }

  //function to delete degree from the education degree list
  function deleteEducationDegree(degreeID) {
    updateCVData(prevCVData => ({
      ...prevCVData,
      education_history: prevCVData.education_history.filter(degree => degree.degreeID !== degreeID)
    }));
  }


  return pageLoading ? <LoadingUI /> :
    <AppTheme>
      <DragDropContext onDragEnd={result => onDragEndHndler(result, cvdata, updateCVData)}>
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
              justifyContent: 'space-between',
              paddingTop: 2,
              width: '100%'
            }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Personal Information
              </Typography>
              <Button variant='contained' onClick={saveCVObject}>Download CV</Button>
            </Box>

            <Box id='cv-content' sx={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 2,
              width: '100%',
            }}>


              {cvdata.hasOwnProperty('basic_information') && !isBasicInfoEditModeOn && <BasicInformationSection basic_information={cvdata.basic_information} setEditBasicInfoMode={setEditBasicInfoMode} />}

              {cvdata.hasOwnProperty('basic_information') && isBasicInfoEditModeOn && <BasicInformationForm basic_information={cvdata.basic_information} updateBasicInformation={updateBasicInformation} setEditBasicInfoMode={setEditBasicInfoMode} />}

              {!_.isNull(cvdata) && <QuickLiinks targets={Object.keys(cvdata)} />}

              <Droppable droppableId={DROPPABLE_TYPE_IDS.mainContainer} type={DROPPABLE_TYPES.Main}>
                {
                  (provided, snapshot) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps} sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 2,
                      width: '100%',
                      border: snapshot.isDraggingOver ? 1 : 0,
                      borderColor: snapshot.isDraggingOver ? '#f9f6ee' : null,
                      boxShadow: snapshot.isDraggingOver ? 1 : 0,
                      borderRadius: snapshot.isDraggingOver ? 2 : 0,
                    }}>

                      {!_.isNull(cvdata) &&
                        Object.keys(cvdata).map((key, index) => {

                          switch (key) {
                            case 'personal_statement':
                              return (
                                <Draggable draggableId={key} key={key} index={index} >
                                  {(provided, snapshot) => {
                                    return (
                                      <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <PersonalStatement isPersonalStatementEditModeOn={isPersonalStatementEditModeOn} personal_statement={cvdata.personal_statement} deletePersonalStatement={deletePersonalStatement} setIsPersonalStatementEditModeOn={setIsPersonalStatementEditModeOn} />
                                        <PersonalStatementForm isPersonalStatementEditModeOn={isPersonalStatementEditModeOn} personal_statement={cvdata.personal_statement} updatePersonalStatement={updatePersonalStatement} setIsPersonalStatementEditModeOn={setIsPersonalStatementEditModeOn} />
                                      </Box>
                                    )
                                  }
                                  }
                                </Draggable>
                              )
                            case 'career_summary':
                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <CareerSummary isCareerSummaryEditMode={isCareerSummaryEditMode} career_summary={cvdata.career_summary} deleteCareerSummary={deleteCareerSummary} setIsCareerSummaryEditMode={setIsCareerSummaryEditMode} />
                                          <CareerSummaryForm isCareerSummaryEditMode={isCareerSummaryEditMode} career_summary={cvdata.career_summary} updateCareerSummary={updateCareerSummary} setIsCareerSummaryEditMode={setIsCareerSummaryEditMode} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'education_history':
                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <EducationTimeLine key={index} education_history={cvdata.education_history} deleteEducationDegree={deleteEducationDegree} openFormForDegreeEdit={openFormForDegreeEdit} setOpenNewEducationForm={setOpenNewEducationForm} deleteEducationHistory={deleteEducationHistory} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'work_history':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <WorkExperienceTimeLine key={index} deleteWorkHistory={deleteWorkHistory} setOpenNewExperienceForm={setOpenNewExperienceForm} work_history={cvdata.work_history} deleteWorkExperience={deleteWorkExperience} openFormForWorkExperienceEdit={openFormForWorkExperienceEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'accreditations':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <AccreditationsTimeLine key={index} accreditations={cvdata.accreditations} deleteAccreditation={deleteAccreditation} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'projects':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <ProjectsTimeline key={index} deleteProjects={deleteProjects} setOpenNewProjectForm={setOpenNewProjectForm} projects={cvdata.projects} deleteProject={deleteProject} openFormForProjectEdit={openFormForProjectEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'technical_skills':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <TechnicalSkillsList key={index} addNewTechnicalSkill={addNewTechnicalSkill} openNewTechnicalSkillForm={openNewTechnicalSkillForm} deleteTechnicallSection={deleteTechnicallSection} setOpenNewTechnicalSkillForm={setOpenNewTechnicalSkillForm} technical_skills={cvdata.technical_skills} deleteTechnicalSkill={deleteTechnicalSkill} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'editorial_experience':
                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <EditorialExperienceTimeLine key={index} deleteEditorialExperienceSection={deleteEditorialExperienceSection} setOpenNewEditorialExperienceForm={setOpenNewEditorialExperienceForm} editorial_experience={cvdata.editorial_experience} deleteEditorialExperience={deleteEditorialExperience} openFormForEditorialExperienceEdit={openFormForEditorialExperienceEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'publications':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <PublicationsTimeLine key={index} setOpenNewPublicationForm={setOpenNewPublicationForm} deletePublications={deletePublications} publications={cvdata.publications} deletePublication={deletePublication} openFormForPublicationEdit={openFormForPublicationEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'committees':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <CommitteeTimeLine key={index} deleteCommitteeSection={deleteCommitteeSection} setOpenNewCommitteeForm={setOpenNewCommitteeForm} committees={cvdata.committees} deleteCommittee={deleteCommittee} openFormForCommitteeEdit={openFormForCommitteeEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'councils':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <CouncilTimeLine key={index} setOpenNewCouncilForm={setOpenNewCouncilForm} deleteCouncilsSection={deleteCouncilsSection} councils={cvdata.councils} deleteCouncil={deleteCouncil} openFormForCouncilEdit={openFormForCouncilEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'memberships':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <MembershipTimeLine key={index} deleteMembershipSection={deleteMembershipSection} setOpenNewMembershipForm={setOpenNewMembershipForm} memberships={cvdata.memberships} deleteMembership={deleteMembership} openFormForMembershipEdit={openFormForMembershipEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'awards_honors':

                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <AwardHonorsTimeLine key={index} deleteAwardSection={deleteAwardSection} setOpenNewAwardHonorForm={setOpenNewAwardHonorForm} awards_honors={cvdata.awards_honors} deleteAward={deleteAward} openFormForAwardHonorEdit={openFormForAwardHonorEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'conferences':
                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <ConferencesList key={index} deleteConferencesSection={deleteConferencesSection} setOpenNewConferenceForm={setOpenNewConferenceForm} conferences={cvdata.conferences} deleteConference={deleteConference} openFormForConferenceEdit={openFormForConferenceEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            case 'journals':
                              return (
                                <Draggable draggableId={key} key={key} index={index}>
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        <Box ref={provided.innerRef} key={key} {...provided.draggableProps} {...provided.dragHandleProps}>
                                          <JournalsList key={index} setOpenNewJournalForm={setOpenNewJournalForm} deleteJournalsSection={deleteJournalsSection} journals={cvdata.journals} deleteJournal={deleteJournal} openFormForJournalEdit={openFormForJournalEdit} />
                                        </Box>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            default:
                              return null
                          }
                        })

                      }
                      {provided.placeholder}
                    </Box>
                  )
                }
              </Droppable>



              <NewEducationDegreeForm open={openNewEducationForm} setOpen={setOpenNewEducationForm} addNewDegree={addNewDegree} />
              <NewWorkExperienceForm open={openNewExperienceForm} setOpen={setOpenNewExperienceForm} addNewWorkExperience={addNewWorkExperience} />
              <NewAccreditionExperienceForm open={openNewAccreditionExperienceForm} setOpen={setOpenNewAccreditionExperienceForm} addNewAccreditionExperience={addNewAccreditionExperience} />
              <NewProjectForm open={openNewProjectForm} setOpen={setOpenNewProjectForm} addNewProject={addNewProject} />
              <NewEditorialExperienceForm open={openNewEditorialExperienceForm} setOpen={setOpenNewEditorialExperienceForm} addNewEditorialExperience={addNewEditorialExperience} />
              <NewPublicationForm open={openNewPublicationForm} setOpen={setOpenNewPublicationForm} addNewPublication={addNewPublication} />
              <NewCommitteeForm open={openNewCommitteeForm} setOpen={setOpenNewCommitteeForm} addNewCommittee={addNewCommittee} />
              <NewCouncilForm open={openNewCouncilForm} setOpen={setOpenNewCouncilForm} addNewCouncil={addNewCouncil} />
              <NewMembershipForm open={openNewMembershipForm} setOpen={setOpenNewMembershipForm} addNewMembership={addNewMembership} />
              <NewAwardHonorForm open={openNewAwardHonorForm} setOpen={setOpenNewAwardHonorForm} addNewAwardHonor={addNewAwardHonor} />
              <NewConferenceForm open={openNewConferenceForm} setOpen={setOpenNewConferenceForm} addNewConference={addNewConference} />
              <NewJournalForm open={openNewJournalForm} setOpen={setOpenNewJournalForm} addNewJournal={addNewJournal} />

              {openEditEducationForm && <EditEducationDegreeForm open={openEditEducationForm} setOpen={setOpenEditEducationForm} qualification={tempStore} editEducationDegree={editEducationDegree} />}
              {openEditExperienceForm && <EditWorkExperienceForm open={openEditExperienceForm} setOpen={setOpenEditExperienceForm} work_experience={tempStore} editWorkExperience={editWorkExperience} />}
              {openEditProjectForm && <EditProjectForm open={openEditProjectForm} setOpen={setOpenEditProjectForm} project={tempStore} editProject={editProject} />}
              {openEditPublicationForm && <EditPublicationForm open={openEditPublicationForm} setOpen={setOpenEditPublicationForm} publication={tempStore} editPublication={editPublication} />}
              {openEditEditorialExperienceForm && <EditEditorialExperienceForm open={openEditEditorialExperienceForm} setOpen={setOpenEditEditorialExperienceForm} experience={tempStore} editEditorialExperience={editEditorialExperience} />}
              {openEditCommitteeForm && <EditCommitteeForm open={openEditCommitteeForm} setOpen={setOpenEditCommitteeForm} committee={tempStore} editCommittee={editCommittee} />}
              {openEditCouncilForm && <EditCouncilForm open={openEditCouncilForm} setOpen={setOpenEditCouncilForm} council={tempStore} editCouncil={editCouncil} />}
              {openEditMembershipForm && <EditMembershipForm open={openEditMembershipForm} setOpen={setOpenEditMembershipForm} membership={tempStore} editMembership={editMembership} />}
              {openEditAwardHonorForm && <EditAwardHonorForm open={openEditAwardHonorForm} setOpen={setOpenEditAwardHonorForm} award={tempStore} editAwardHonor={editAwardHonor} />}
              {openEditConferenceForm && <EditConferenceForm open={openEditConferenceForm} setOpen={setOpenEditConferenceForm} conference={tempStore} editConference={editConference} />}
              {openEditJournalForm && <EditJournalForm open={openEditJournalForm} setOpen={setOpenEditJournalForm} jrnl={tempStore} editJournal={editJournal} />}
            </Box>
            <CVSectionButtons keys={Object.keys(cvdata)} CVMenuButtonHandlers={CVMenuButtonHandlers} />
            <Toast message={toastPayLoad.message} show={toastPayLoad.show} severity={toastPayLoad.severity}/>
            <FloatingButton />
          </Box>
        </Box>
      </DragDropContext>
    </AppTheme>
}

