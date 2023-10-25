'use client';
import { Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
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
import {
  DROPPABLE_TYPE_IDS,
  DROPPABLE_TYPES,
  RESPONSE_SEVERITY,
} from '@/data/data';
import { ENDPOINT } from '@/data/endpoints';
import { API_CALLS } from '@/assets/apicalls';
import { CVDATA_TEMPLATE } from '@/assets/cvdata';
import Toast from './Toast';
import AppTopBar from './TopMenuBar';
import EditAccreditionExperienceForm from './forms/FormsForEdit/EditAccreditionExperienceForm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DialogForDeleteSection from './DialogForDeleteSection';

export default function MyCV({ userData, authToken }) {
  const [cvdata, updateCVData] = useState({});
  const [openDeleteSectionDialog, setOpenDeleteSectionDialog] = useState(false);
  const [deleteDialogResponse, setDeleteDialogResponse] = useState(false);
  const [deleteSectionName, setDeleteSectionName] = useState('');
  const [isBasicInfoEditModeOn, setEditBasicInfoMode] = useState(false);
  const [isPersonalStatementEditModeOn, setIsPersonalStatementEditModeOn] =
    useState(false);
  const [isCareerSummaryEditMode, setIsCareerSummaryEditMode] = useState(false);

  //states for forms for entering new entry
  const [openNewEducationForm, setOpenNewEducationForm] = useState(false);
  const [openNewExperienceForm, setOpenNewExperienceForm] = useState(false);
  const [
    openNewAccreditionExperienceForm,
    setOpenNewAccreditionExperienceForm,
  ] = useState(false);
  const [openNewProjectForm, setOpenNewProjectForm] = useState(false);
  const [openNewTechnicalSkillForm, setOpenNewTechnicalSkillForm] =
    useState(false);
  const [openNewEditorialExperienceForm, setOpenNewEditorialExperienceForm] =
    useState(false);
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
  const [
    openEditAccreditionExperienceForm,
    setOpenEditAccreditionExperienceForm,
  ] = useState(false);
  const [openEditProjectForm, setOpenEditProjectForm] = useState(false);
  const [openEditEditorialExperienceForm, setOpenEditEditorialExperienceForm] =
    useState(false);
  const [openEditPublicationForm, setOpenEditPublicationForm] = useState(false);
  const [openEditCommitteeForm, setOpenEditCommitteeForm] = useState(false);
  const [openEditCouncilForm, setOpenEditCouncilForm] = useState(false);
  const [openEditMembershipForm, setOpenEditMembershipForm] = useState(false);
  const [openEditAwardHonorForm, setOpenEditAwardHonorForm] = useState(false);
  const [openEditConferenceForm, setOpenEditConferenceForm] = useState(false);
  const [openEditJournalForm, setOpenEditJournalForm] = useState(false);
  const router = useRouter();
  const [pageLoading, setIsPageLoading] = useState(true);
  const [tempStore, setTempStore] = useState(null);
  const [toastPayLoad, setToastPayLoad] = useState({
    show: false,
    severity: 'success',
    message: '',
  });

  useEffect(() => {
    document.title = `Welcome @${userData.username}`;
    async function fetchData() {
      await fetchCVData();
    }
    fetchData();
  }, []);

  //useeffct for executinng the complete delete operation
  useEffect(() => {

    if (!deleteDialogResponse) return;

    async function deleteCVSection() {

      const response = await API_CALLS.deleteSection(
        authToken,
        deleteSectionName
      );
      if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
        const { [deleteSectionName]: data, ...rest } = cvdata;
        updateCVData({ ...rest });
      }
      setDeleteDialogResponse(false)
      setToastPayLoad({
        show: true,
        severity: response.severity,
        message: response.message,
      });


    }

    deleteCVSection();



  }, [deleteDialogResponse]);

  //function for calling a function for converting document into pdf format
  const saveCVObject = () => {
    downloadCV(cvdata);
  };

  // function for getting CV data
  async function fetchCVData() {
    fetch(ENDPOINT.GETCV, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        charset: 'UTF-8',
        'auth-token': authToken,
      },
    })
      .then(async (response) => {
        var json = await response.json();
        return { status: response.status, ...json };
      })
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          updateCVData(response.data);
          setIsPageLoading(false);
        } else {
          const { error } = response;
          console.log(error);
          setIsPageLoading(false);
          router.push('/error');
        }
      })
      .catch((error) => {
        console.log(error);
        setIsPageLoading(false);
        router.push('/error');
      });
  }
  /*************************************  FUNCTION FOR OPENING FORM FOR EDITING DATA  **************************************************/

  // function for setting the form up for editing journal details
  function openFormForJournalEdit(_id) {
    setTempStore(cvdata.journals.find((journal) => journal._id == _id));
    setOpenEditJournalForm(true);
  }

  // function for setting the form up for editing accreditations experience
  function openFormForAccreditationExperienceEdit(_id) {
    setTempStore(
      cvdata.accreditations_experience.find(
        (accreditation) => accreditation._id == _id
      )
    );
    setOpenEditAccreditionExperienceForm(true);
  }

  // function for setting the form up for editing conference details
  function openFormForConferenceEdit(_id) {
    setTempStore(
      cvdata.conferences.find((conference) => conference._id == _id)
    );
    setOpenEditConferenceForm(true);
  }

  // function for setting the form up for editing award and honor details
  function openFormForAwardHonorEdit(_id) {
    setTempStore(cvdata.awards_honors.find((award) => award._id == _id));
    setOpenEditAwardHonorForm(true);
  }

  // function for setting the form up for editing membership details
  function openFormForMembershipEdit(_id) {
    setTempStore(
      cvdata.memberships.find((membership) => membership._id == _id)
    );
    setOpenEditMembershipForm(true);
  }

  // function for setting the form up for editing council details
  function openFormForCouncilEdit(_id) {
    setTempStore(cvdata.councils.find((council) => council._id == _id));
    setOpenEditCouncilForm(true);
  }

  // function for setting the form up for editing editorial experience
  function openFormForCommitteeEdit(_id) {
    setTempStore(cvdata.committees.find((committee) => committee._id == _id));
    setOpenEditCommitteeForm(true);
  }

  // function for setting the form up for editing editorial experience
  function openFormForEditorialExperienceEdit(_id) {
    setTempStore(
      cvdata.editorial_experience.find((experience) => experience._id == _id)
    );
    setOpenEditEditorialExperienceForm(true);
  }

  // function for setting the form up for editing publication information
  function openFormForPublicationEdit(_id) {
    setTempStore(
      cvdata.publications.find((publication) => publication._id == _id)
    );
    setOpenEditPublicationForm(true);
  }

  // function for setting the form up for editing project information
  function openFormForProjectEdit(_id) {
    setTempStore(cvdata.projects.find((project) => project._id == _id));
    setOpenEditProjectForm(true);
  }

  // function for setting the form for editing degree information and loading the data into tempstorage
  function openFormForDegreeEdit(_id) {
    setTempStore(cvdata.education_history.find((degree) => degree._id == _id));
    setOpenEditEducationForm(true);
  }

  // function for opening th form for dediting employment details
  function openFormForWorkExperienceEdit(_id) {
    setTempStore(
      cvdata.work_history.find((work_experience) => work_experience._id == _id)
    );
    setOpenEditExperienceForm(true);
  }

  // function to update Career summary
  async function updateCareerSummary(updatedCareerSummary) {
    const response = await API_CALLS.addRecord(authToken, 'career_summary', {
      career_summary: updatedCareerSummary,
    });

    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        career_summary: updatedCareerSummary,
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  // function to update Personal Statement
  async function updatePersonalStatement(updatedStatement) {
    const response = await API_CALLS.addRecord(
      authToken,
      'personal_statement',
      { personal_statement: updatedStatement }
    );

    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        personal_statement: updatedStatement,
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  // function to update BasicInformation
  async function updateBasicInformation(updatedData) {
    console.log(updatedData);
    const response = await API_CALLS.addRecord(
      authToken,
      'basic_information',
      updatedData
    );
    console.log(response);

    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        basic_information: updatedData,
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }


  // function to uplaod profile picture
  async function uploadProfilePicture(formData) {

    const response = await API_CALLS.uploadProfilePicture(
      authToken,
      formData
    );
    console.log(response);

    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    return response;
  }

  /******************************************* FUNCTION FOR APPENDING NEW ITEMS TO THE LIST ************************************************ */

  //function to add new editorial experience to the exisiting list
  async function addNewEditorialExperience(editorialExperienceDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'editorial_experience',
      editorialExperienceDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        editorial_experience: [
          response.data,
          ...prevCVData.editorial_experience,
        ],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new accreditation to the exisiting list
  async function addNewAccreditionExperience(accreditationDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'accreditations_experience',
      accreditationDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        accreditations_experience: [
          response.data,
          ...prevCVData.accreditations_experience,
        ],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new technical skill to the exisiting list
  async function addNewTechnicalSkill(skillDetails) {
    console.log(skillDetails);
    const response = await API_CALLS.addRecord(
      authToken,
      'technical_skills',
      skillDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        technical_skills: [response.data, ...prevCVData.technical_skills],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new conference entry to the exisiting list
  async function addNewJournal(journalDetails) {
    console.log(journalDetails);
    const response = await API_CALLS.addRecord(
      authToken,
      'journals',
      journalDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        journals: [response.data, ...prevCVData.journals],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new conference entry to the exisiting list
  async function addNewConference(conferenceDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'conferences',
      conferenceDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        conferences: [response.data, ...prevCVData.conferences],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new award ifnromation to the exisiting list
  async function addNewAwardHonor(awardDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'awards_honors',
      awardDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        awards_honors: [response.data, ...prevCVData.awards_honors],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new membership details to the exisiting list
  async function addNewMembership(membershipDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'memberships',
      membershipDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        memberships: [response.data, ...prevCVData.memberships],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new committee to the exisiting list
  async function addNewCommittee(newCommitteeDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'committees',
      newCommitteeDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        committees: [response.data, ...prevCVData.committees],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new publication to the exisiting list
  async function addNewCouncil(newCouncilData) {
    console.log(newCouncilData);
    const response = await API_CALLS.addRecord(
      authToken,
      'councils',
      newCouncilData
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        councils: [response.data, ...prevCVData.councils],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new publication to the exisiting list
  async function addNewPublication(newPublicationData) {
    console.log(newPublicationData);
    const response = await API_CALLS.addRecord(
      authToken,
      'publications',
      newPublicationData
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        publications: [response.data, ...prevCVData.publications],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new work experience
  async function addNewWorkExperience(newWorkExperience) {
    const response = await API_CALLS.addRecord(
      authToken,
      'work_history',
      newWorkExperience
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        work_history: [response.data, ...prevCVData.work_history],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new project Information
  async function addNewProject(newProjectDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'projects',
      newProjectDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        projects: [response.data, ...prevCVData.projects],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to add new degree Information
  async function addNewDegree(newDegreeDetails) {
    const response = await API_CALLS.addRecord(
      authToken,
      'education_history',
      newDegreeDetails
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      console.log(response);
      updateCVData((prevCVData) => ({
        ...prevCVData,
        education_history: [response.data, ...prevCVData.education_history],
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  /********************************** FUNCTION FOR DELEING THE PROPERTY FROM THE OBJECT *************************************************** */

  // function to delete editorial experience property from the object
  function deleteEditorialExperienceSection() {
    setDeleteSectionName('editorial_experience');
    setOpenDeleteSectionDialog(true);
  }

  // function to delte accreditations property from the object
  function deleteAccreditationsSection() {
    setDeleteSectionName('accreditations_experience');
    setOpenDeleteSectionDialog(true);
  }

  // function to delete technicalSkills property from the object
  function deleteTechnicallSection() {
    setDeleteSectionName('technical_skills');
    setOpenDeleteSectionDialog(true);

  }

  // function to delete journals property from the object
  function deleteJournalsSection() {
    setDeleteSectionName('journals');
    setOpenDeleteSectionDialog(true);

  }

  // function to delete conferences property from the object
  function deleteConferencesSection() {
    setDeleteSectionName('conferences');
    setOpenDeleteSectionDialog(true);

  }

  // function to delete awards property from the object
  function deleteAwardSection() {
    setDeleteSectionName('awards_honors');
    setOpenDeleteSectionDialog(true);

  }

  // function to delete memberships property from the object
  function deleteMembershipSection() {
    setDeleteSectionName('memberships');
    setOpenDeleteSectionDialog(true);

  }

  // function to delete committees property from the object
  function deleteCommitteeSection() {
    setDeleteSectionName('committees');
    setOpenDeleteSectionDialog(true);

  }

  // function to delete councils property from the object
  function deleteCouncilsSection() {
    setDeleteSectionName('councils');
    setOpenDeleteSectionDialog(true);
  }

  // function to delete personal statement
  function deletePersonalStatement() {
    setDeleteSectionName('personal_statement');
    setOpenDeleteSectionDialog(true);

  }

  // function to delete career summary
  function deleteCareerSummary() {


    setDeleteSectionName('career_summary');
    setOpenDeleteSectionDialog(true);
  }

  // function to delete education history
  function deleteEducationHistory() {

    setDeleteSectionName('education_history');
    setOpenDeleteSectionDialog(true);
  }

  // function to delete work history
  function deleteWorkHistory() {

    setDeleteSectionName('work_history');
    setOpenDeleteSectionDialog(true);
  }

  // function to delete Publications
  function deletePublications() {

    setDeleteSectionName('publications');
    setOpenDeleteSectionDialog(true);


  }

  // function to delete Projects Section
  function deleteProjects() {

    setDeleteSectionName('projects');
    setOpenDeleteSectionDialog(true);

  }

  /************************************* FUNCTION FOR ADDING PROPERTY BACK TO THE MAIN OBJECT ***********************************************/

  const CVMenuButtonHandlers = {
    //function for adding editorialExperience property to the list
    addNewEditorialExperienceSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        editorial_experience: [],
      }));
    },

    //function for adding accreditationsections property to the list
    addAccreditionsSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        accreditations_experience: [],
      }));
    },

    //function for adding technical skills property to the list
    addTechnicalSkillsSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        technical_skills: [],
      }));
    },

    //function for adding journals property to the list
    addJournalsSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        journals: [],
      }));
    },

    //function for adding conferences property to the list
    addConferencesSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        conferences: [],
      }));
    },

    //function for adding awards property to the list
    addAwardSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        awards_honors: [],
      }));
    },

    //function for adding memberships property to the list
    addMembershipsSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        memberships: [],
      }));
    },

    //function for adding committee to the list
    addCommitteeSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        committees: [],
      }));
    },

    //function for adding councils object
    addCouncilsSection: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        councils: [],
      }));
    },

    //function for adding personal statement
    addPersonalStatement: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        personal_statement: 'Double tap or click to update ...',
      }));
    },

    // function to add career summary
    addCareerSummary: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        career_summary: 'Double tap or click to update ...',
      }));
    },

    // function to add education history
    addEducationHistory: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        education_history: [],
      }));
    },

    // function to add work history section
    addWorkHistory: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        work_history: [],
      }));
    },

    // function to add Publications
    addPublications: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        publications: [],
      }));
    },

    // function to add  Projects Section
    addProjects: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        projects: [],
      }));
    },

    // function to add  Projects Section
    addBasicInformation: () => {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        basic_information: CVDATA_TEMPLATE,
      }));
    },
  };

  /*************************************** FUNCTION TO EDIT INDIVIDUAL ITEMS FROM THE LIST *****************************************/

  //function to edit journal from  the existing list
  async function editJournal(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'journals',
      updatedData,
      updatedData._id
    );

    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        journals: prevCVData.journals.map((journal) =>
          journal._id == updatedData._id ? updatedData : journal
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit conference from  the existing list
  async function editConference(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'conferences',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        conferences: prevCVData.conferences.map((conference) =>
          conference._id == updatedData._id ? updatedData : conference
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit awardHonor details from the existing list
  async function editAwardHonor(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'awards_honors',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        awards_honors: prevCVData.awards_honors.map((award) =>
          award._id == updatedData._id ? updatedData : award
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit membership details from the existing list
  async function editMembership(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'memberships',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        memberships: prevCVData.memberships.map((membership) =>
          membership._id == updatedData._id ? updatedData : membership
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit council details from the existing list
  async function editCouncil(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'councils',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        councils: prevCVData.councils.map((council) =>
          council._id == updatedData._id ? updatedData : council
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit committee details from the existing list
  async function editCommittee(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'committees',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        committees: prevCVData.committees.map((committee) =>
          committee._id == updatedData._id ? updatedData : committee
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit editorial experience from the existing list
  async function editEditorialExperience(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'editorial_experience',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        editorial_experience: prevCVData.editorial_experience.map(
          (experience) =>
            experience._id == updatedData._id ? updatedData : experience
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit accredition experience from the existing list
  async function editAccreditionExperience(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'accreditations_experience',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        accreditations_experience: prevCVData.accreditations_experience.map(
          (accreditation) =>
            accreditation._id == updatedData._id ? updatedData : accreditation
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit publication detail from the existing list
  async function editPublication(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'publications',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        publications: prevCVData.publications.map((publication) =>
          publication._id == updatedData._id ? updatedData : publication
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit project detail from the existing list
  async function editProject(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'projects',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        projects: prevCVData.projects.map((project) =>
          project._id == updatedData._id ? updatedData : project
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit education degree item from the exisiting list
  async function editEducationDegree(updatedData) {
    console.log(updatedData);

    const response = await API_CALLS.updateSection(
      authToken,
      'education_history',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        education_history: prevCVData.education_history.map((degree) =>
          degree._id == updatedData._id ? updatedData : degree
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  //function to edit work experience item from the exisiting list
  async function editWorkExperience(updatedData) {
    const response = await API_CALLS.updateSection(
      authToken,
      'work_history',
      updatedData,
      updatedData._id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        work_history: prevCVData.work_history.map((work_experience) =>
          work_experience._id == updatedData._id ? updatedData : work_experience
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
    setTempStore(null);
  }

  /*************************************** FUNCTION TO DELETE INDIVIDUAL ITEMS FROM THE LIST ***************************************/

  //function to delete editorialExperience item from the exisiting list
  async function deleteEditorialExperience(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'editorial_experience',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        editorial_experience: prevCVData.editorial_experience.filter(
          (experience) => experience._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete accreditation details from the exisiting list
  async function deleteAccreditation(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'accreditations_experience',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        accreditations_experience: prevCVData.accreditations_experience.filter(
          (accreditation) => accreditation._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete technical skills details from the exisiting list
  async function deleteTechnicalSkill(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'technical_skills',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        technical_skills: prevCVData.technical_skills.filter(
          (skill) => skill._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete journal details from the exisiting list
  async function deleteJournal(_id) {
    const response = await API_CALLS.deleteRecord(authToken, 'journals', _id);
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        journals: prevCVData.journals.filter((journal) => journal._id !== _id),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete conference details from the exisiting list
  async function deleteConference(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'conferences',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        conferences: prevCVData.conferences.filter(
          (conference) => conference._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete award details from the exisiting list
  async function deleteAward(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'awards_honors',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        awards_honors: prevCVData.awards_honors.filter(
          (award) => award._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete membership details from the exisiting list
  async function deleteMembership(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'memberships',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        memberships: prevCVData.memberships.filter(
          (membership) => membership._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete committee from the exisiting list
  async function deleteCommittee(_id) {
    const response = await API_CALLS.deleteRecord(authToken, 'committees', _id);
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        committees: prevCVData.committees.filter(
          (committee) => committee._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete council from the exisiting list
  async function deleteCouncil(_id) {
    const response = await API_CALLS.deleteRecord(authToken, 'councils', _id);
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        councils: prevCVData.councils.filter((council) => council._id !== _id),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete publication from the exisiting list
  async function deletePublication(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'publications',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        publications: prevCVData.publications.filter(
          (publication) => publication._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete existing work experience
  async function deleteWorkExperience(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'work_history',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        work_history: prevCVData.work_history.filter(
          (experience) => experience._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete project from the list
  async function deleteProject(_id) {
    const response = await API_CALLS.deleteRecord(authToken, 'projects', _id);
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        projects: prevCVData.projects.filter((project) => project._id !== _id),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  //function to delete degree from the education degree list
  async function deleteEducationDegree(_id) {
    const response = await API_CALLS.deleteRecord(
      authToken,
      'education_history',
      _id
    );
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      updateCVData((prevCVData) => ({
        ...prevCVData,
        education_history: prevCVData.education_history.filter(
          (degree) => degree._id !== _id
        ),
      }));
    }
    setToastPayLoad({
      show: true,
      severity: response.severity,
      message: response.message,
    });
  }

  return pageLoading ? (
    <LoadingUI />
  ) : (
    <AppTheme>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEndHndler(result, cvdata, updateCVData, authToken)
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <AppTopBar userData={userData} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              paddingX: {
                xs: 1,
                sm: 5,
                md: 10,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: 2,
                gap: 1,
                width: '100%',
              }}
            >
              <CopyToClipboard
                text={`${window.location}/${userData.username}`}
                onCopy={() =>
                  setToastPayLoad({
                    show: true,
                    severity: 'success',
                    message: 'CV link copied!',
                  })
                }
              >
                <Button size="small" variant="outlined" sx={{ textTransform: 'none', }}>
                  Copy link to my CV
                </Button>
              </CopyToClipboard>
              <Button size="small" variant="contained" onClick={saveCVObject} sx={{ textTransform: 'none', }}>
                Download CV
              </Button>
            </Box>

            <Box
              id="cv-content"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 2,
                width: '100%',
              }}
            >
              {cvdata.hasOwnProperty('basic_information') &&
                !isBasicInfoEditModeOn && (
                  <BasicInformationSection
                    userData={userData}
                    basic_information={cvdata.basic_information}
                    setEditBasicInfoMode={setEditBasicInfoMode}
                    uploadProfilePicture={uploadProfilePicture}
                  />
                )}

              {cvdata.hasOwnProperty('basic_information') &&
                isBasicInfoEditModeOn && (
                  <BasicInformationForm
                    userData={userData}
                    basic_information={cvdata.basic_information}
                    updateBasicInformation={updateBasicInformation}
                    setEditBasicInfoMode={setEditBasicInfoMode}
                  />
                )}

              {!_.isNull(cvdata) && (
                <QuickLiinks targets={Object.keys(cvdata)} />
              )}

              <Droppable
                droppableId={DROPPABLE_TYPE_IDS.mainContainer}
                type={DROPPABLE_TYPES.Main}
              >
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 2,
                      width: '100%',
                      border: snapshot.isDraggingOver ? 1 : 0,
                      borderColor: snapshot.isDraggingOver ? '#f9f6ee' : null,
                      boxShadow: snapshot.isDraggingOver ? 1 : 0,
                      borderRadius: snapshot.isDraggingOver ? 2 : 0,
                    }}
                  >
                    {!_.isNull(cvdata) &&
                      Object.keys(cvdata).map((key, index) => {
                        switch (key) {
                          case 'personal_statement':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <PersonalStatement
                                        isPersonalStatementEditModeOn={
                                          isPersonalStatementEditModeOn
                                        }
                                        personal_statement={
                                          cvdata.personal_statement
                                        }
                                        deletePersonalStatement={
                                          deletePersonalStatement
                                        }
                                        setIsPersonalStatementEditModeOn={
                                          setIsPersonalStatementEditModeOn
                                        }
                                      />
                                      <PersonalStatementForm
                                        isPersonalStatementEditModeOn={
                                          isPersonalStatementEditModeOn
                                        }
                                        personal_statement={
                                          cvdata.personal_statement
                                        }
                                        updatePersonalStatement={
                                          updatePersonalStatement
                                        }
                                        setIsPersonalStatementEditModeOn={
                                          setIsPersonalStatementEditModeOn
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'career_summary':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <CareerSummary
                                        isCareerSummaryEditMode={
                                          isCareerSummaryEditMode
                                        }
                                        career_summary={cvdata.career_summary}
                                        deleteCareerSummary={
                                          deleteCareerSummary
                                        }
                                        setIsCareerSummaryEditMode={
                                          setIsCareerSummaryEditMode
                                        }
                                      />
                                      <CareerSummaryForm
                                        isCareerSummaryEditMode={
                                          isCareerSummaryEditMode
                                        }
                                        career_summary={cvdata.career_summary}
                                        updateCareerSummary={
                                          updateCareerSummary
                                        }
                                        setIsCareerSummaryEditMode={
                                          setIsCareerSummaryEditMode
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'education_history':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <EducationTimeLine
                                        key={index}
                                        education_history={
                                          cvdata.education_history
                                        }
                                        deleteEducationDegree={
                                          deleteEducationDegree
                                        }
                                        openFormForDegreeEdit={
                                          openFormForDegreeEdit
                                        }
                                        setOpenNewEducationForm={
                                          setOpenNewEducationForm
                                        }
                                        deleteEducationHistory={
                                          deleteEducationHistory
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'work_history':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <WorkExperienceTimeLine
                                        key={index}
                                        deleteWorkHistory={deleteWorkHistory}
                                        setOpenNewExperienceForm={
                                          setOpenNewExperienceForm
                                        }
                                        work_history={cvdata.work_history}
                                        deleteWorkExperience={
                                          deleteWorkExperience
                                        }
                                        openFormForWorkExperienceEdit={
                                          openFormForWorkExperienceEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'accreditations_experience':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <AccreditationsTimeLine
                                        key={index}
                                        deleteAccreditationsSection={
                                          deleteAccreditationsSection
                                        }
                                        setOpenNewAccreditionExperienceForm={
                                          setOpenNewAccreditionExperienceForm
                                        }
                                        accreditations_experience={
                                          cvdata.accreditations_experience
                                        }
                                        deleteAccreditation={
                                          deleteAccreditation
                                        }
                                        openFormForAccreditationExperienceEdit={
                                          openFormForAccreditationExperienceEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'projects':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <ProjectsTimeline
                                        key={index}
                                        deleteProjects={deleteProjects}
                                        setOpenNewProjectForm={
                                          setOpenNewProjectForm
                                        }
                                        projects={cvdata.projects}
                                        deleteProject={deleteProject}
                                        openFormForProjectEdit={
                                          openFormForProjectEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'technical_skills':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <TechnicalSkillsList
                                        key={index}
                                        addNewTechnicalSkill={
                                          addNewTechnicalSkill
                                        }
                                        openNewTechnicalSkillForm={
                                          openNewTechnicalSkillForm
                                        }
                                        deleteTechnicallSection={
                                          deleteTechnicallSection
                                        }
                                        setOpenNewTechnicalSkillForm={
                                          setOpenNewTechnicalSkillForm
                                        }
                                        technical_skills={
                                          cvdata.technical_skills
                                        }
                                        deleteTechnicalSkill={
                                          deleteTechnicalSkill
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'editorial_experience':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <EditorialExperienceTimeLine
                                        key={index}
                                        deleteEditorialExperienceSection={
                                          deleteEditorialExperienceSection
                                        }
                                        setOpenNewEditorialExperienceForm={
                                          setOpenNewEditorialExperienceForm
                                        }
                                        editorial_experience={
                                          cvdata.editorial_experience
                                        }
                                        deleteEditorialExperience={
                                          deleteEditorialExperience
                                        }
                                        openFormForEditorialExperienceEdit={
                                          openFormForEditorialExperienceEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'publications':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <PublicationsTimeLine
                                        key={index}
                                        setOpenNewPublicationForm={
                                          setOpenNewPublicationForm
                                        }
                                        deletePublications={deletePublications}
                                        publications={cvdata.publications}
                                        deletePublication={deletePublication}
                                        openFormForPublicationEdit={
                                          openFormForPublicationEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'committees':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <CommitteeTimeLine
                                        key={index}
                                        deleteCommitteeSection={
                                          deleteCommitteeSection
                                        }
                                        setOpenNewCommitteeForm={
                                          setOpenNewCommitteeForm
                                        }
                                        committees={cvdata.committees}
                                        deleteCommittee={deleteCommittee}
                                        openFormForCommitteeEdit={
                                          openFormForCommitteeEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'councils':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <CouncilTimeLine
                                        key={index}
                                        setOpenNewCouncilForm={
                                          setOpenNewCouncilForm
                                        }
                                        deleteCouncilsSection={
                                          deleteCouncilsSection
                                        }
                                        councils={cvdata.councils}
                                        deleteCouncil={deleteCouncil}
                                        openFormForCouncilEdit={
                                          openFormForCouncilEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'memberships':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <MembershipTimeLine
                                        key={index}
                                        deleteMembershipSection={
                                          deleteMembershipSection
                                        }
                                        setOpenNewMembershipForm={
                                          setOpenNewMembershipForm
                                        }
                                        memberships={cvdata.memberships}
                                        deleteMembership={deleteMembership}
                                        openFormForMembershipEdit={
                                          openFormForMembershipEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'awards_honors':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <AwardHonorsTimeLine
                                        key={index}
                                        deleteAwardSection={deleteAwardSection}
                                        setOpenNewAwardHonorForm={
                                          setOpenNewAwardHonorForm
                                        }
                                        awards_honors={cvdata.awards_honors}
                                        deleteAward={deleteAward}
                                        openFormForAwardHonorEdit={
                                          openFormForAwardHonorEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'conferences':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <ConferencesList
                                        key={index}
                                        deleteConferencesSection={
                                          deleteConferencesSection
                                        }
                                        setOpenNewConferenceForm={
                                          setOpenNewConferenceForm
                                        }
                                        conferences={cvdata.conferences}
                                        deleteConference={deleteConference}
                                        openFormForConferenceEdit={
                                          openFormForConferenceEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          case 'journals':
                            return (
                              <Draggable
                                draggableId={key}
                                key={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      key={key}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <JournalsList
                                        key={index}
                                        setOpenNewJournalForm={
                                          setOpenNewJournalForm
                                        }
                                        deleteJournalsSection={
                                          deleteJournalsSection
                                        }
                                        journals={cvdata.journals}
                                        deleteJournal={deleteJournal}
                                        openFormForJournalEdit={
                                          openFormForJournalEdit
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          default:
                            return null;
                        }
                      })}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>

              <NewEducationDegreeForm
                open={openNewEducationForm}
                setOpen={setOpenNewEducationForm}
                addNewDegree={addNewDegree}
              />
              <NewWorkExperienceForm
                open={openNewExperienceForm}
                setOpen={setOpenNewExperienceForm}
                addNewWorkExperience={addNewWorkExperience}
              />
              <NewAccreditionExperienceForm
                open={openNewAccreditionExperienceForm}
                setOpen={setOpenNewAccreditionExperienceForm}
                addNewAccreditionExperience={addNewAccreditionExperience}
              />
              <NewProjectForm
                open={openNewProjectForm}
                setOpen={setOpenNewProjectForm}
                addNewProject={addNewProject}
              />
              <NewEditorialExperienceForm
                open={openNewEditorialExperienceForm}
                setOpen={setOpenNewEditorialExperienceForm}
                addNewEditorialExperience={addNewEditorialExperience}
              />
              <NewPublicationForm
                open={openNewPublicationForm}
                setOpen={setOpenNewPublicationForm}
                addNewPublication={addNewPublication}
              />
              <NewCommitteeForm
                open={openNewCommitteeForm}
                setOpen={setOpenNewCommitteeForm}
                addNewCommittee={addNewCommittee}
              />
              <NewCouncilForm
                open={openNewCouncilForm}
                setOpen={setOpenNewCouncilForm}
                addNewCouncil={addNewCouncil}
              />
              <NewMembershipForm
                open={openNewMembershipForm}
                setOpen={setOpenNewMembershipForm}
                addNewMembership={addNewMembership}
              />
              <NewAwardHonorForm
                open={openNewAwardHonorForm}
                setOpen={setOpenNewAwardHonorForm}
                addNewAwardHonor={addNewAwardHonor}
              />
              <NewConferenceForm
                open={openNewConferenceForm}
                setOpen={setOpenNewConferenceForm}
                addNewConference={addNewConference}
              />
              <NewJournalForm
                open={openNewJournalForm}
                setOpen={setOpenNewJournalForm}
                addNewJournal={addNewJournal}
              />

              {openEditEducationForm && (
                <EditEducationDegreeForm
                  open={openEditEducationForm}
                  setOpen={setOpenEditEducationForm}
                  qualification={tempStore}
                  editEducationDegree={editEducationDegree}
                />
              )}
              {openEditExperienceForm && (
                <EditWorkExperienceForm
                  open={openEditExperienceForm}
                  setOpen={setOpenEditExperienceForm}
                  work_experience={tempStore}
                  editWorkExperience={editWorkExperience}
                />
              )}
              {openEditProjectForm && (
                <EditProjectForm
                  open={openEditProjectForm}
                  setOpen={setOpenEditProjectForm}
                  project={tempStore}
                  editProject={editProject}
                />
              )}
              {openEditPublicationForm && (
                <EditPublicationForm
                  open={openEditPublicationForm}
                  setOpen={setOpenEditPublicationForm}
                  publication={tempStore}
                  editPublication={editPublication}
                />
              )}
              {openEditEditorialExperienceForm && (
                <EditEditorialExperienceForm
                  open={openEditEditorialExperienceForm}
                  setOpen={setOpenEditEditorialExperienceForm}
                  experience={tempStore}
                  editEditorialExperience={editEditorialExperience}
                />
              )}
              {openEditCommitteeForm && (
                <EditCommitteeForm
                  open={openEditCommitteeForm}
                  setOpen={setOpenEditCommitteeForm}
                  committee={tempStore}
                  editCommittee={editCommittee}
                />
              )}
              {openEditCouncilForm && (
                <EditCouncilForm
                  open={openEditCouncilForm}
                  setOpen={setOpenEditCouncilForm}
                  council={tempStore}
                  editCouncil={editCouncil}
                />
              )}
              {openEditMembershipForm && (
                <EditMembershipForm
                  open={openEditMembershipForm}
                  setOpen={setOpenEditMembershipForm}
                  membership={tempStore}
                  editMembership={editMembership}
                />
              )}
              {openEditAwardHonorForm && (
                <EditAwardHonorForm
                  open={openEditAwardHonorForm}
                  setOpen={setOpenEditAwardHonorForm}
                  award={tempStore}
                  editAwardHonor={editAwardHonor}
                />
              )}
              {openEditConferenceForm && (
                <EditConferenceForm
                  open={openEditConferenceForm}
                  setOpen={setOpenEditConferenceForm}
                  conference={tempStore}
                  editConference={editConference}
                />
              )}
              {openEditJournalForm && (
                <EditJournalForm
                  open={openEditJournalForm}
                  setOpen={setOpenEditJournalForm}
                  jrnl={tempStore}
                  editJournal={editJournal}
                />
              )}
              {openEditAccreditionExperienceForm && (
                <EditAccreditionExperienceForm
                  open={openEditAccreditionExperienceForm}
                  setOpen={setOpenEditAccreditionExperienceForm}
                  editAccreditionExperience={editAccreditionExperience}
                  accreditation={tempStore}
                />
              )}
            </Box>
            <CVSectionButtons
              keys={Object.keys(cvdata)}
              CVMenuButtonHandlers={CVMenuButtonHandlers}
            />
            {toastPayLoad.show && (
              <Toast
                message={toastPayLoad.message}
                show={toastPayLoad.show}
                severity={toastPayLoad.severity}
                setToastPayLoad={setToastPayLoad}
              />
            )}
            <FloatingButton />
            {deleteSectionName && <DialogForDeleteSection open={openDeleteSectionDialog} setOpen={setOpenDeleteSectionDialog} sectionName={deleteSectionName} setDeleteDialogResponse={setDeleteDialogResponse} />}
          </Box>
        </Box>
      </DragDropContext>
    </AppTheme>
  );
}
