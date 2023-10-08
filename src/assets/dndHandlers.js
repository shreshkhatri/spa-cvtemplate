import { DROPPABLE_TYPE_IDS, RESPONSE_SEVERITY } from "@/data/data";
import { ENDPOINT } from "@/data/endpoints";
import { API_CALLS } from "./apicalls";

/*************************************** IMPLMENTATION FOR onDragEnd OPERATION ***********************************/

export async function onDragEndHndler(result, cvdata, updateCVData, authToken) {

  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  console.log(result)

  if (source.droppableId === DROPPABLE_TYPE_IDS.mainContainer && destination.droppableId === DROPPABLE_TYPE_IDS.mainContainer) {

    const response = await API_CALLS.reorderSection(authToken, draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      const arrayKeyValuePair = Object.entries(cvdata);
      const deletedItem = arrayKeyValuePair.splice(source.index, 1);
      arrayKeyValuePair.splice(destination.index, 0, ...deletedItem);
      const objectForm = Object.fromEntries(arrayKeyValuePair)
      updateCVData(objectForm);
    }

  }

  //case to update education history after drag and drop

  if (source.droppableId === DROPPABLE_TYPE_IDS.educationTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.educationTimeline) {

    const response = await API_CALLS.reorderRecord(authToken, 'education_history', draggableId, destination.index)

    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {


      const { education_history } = cvdata;
      const tempArray = [...education_history];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        education_history: tempArray
      }));
    }
  }


  //case to update project history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.projectTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.projectTimeline) {
    const response = await API_CALLS.reorderRecord(authToken, 'projects', draggableId, destination.index)

    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      const { projects } = cvdata;
      const tempArray = [...projects];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        projects: tempArray
      }));
    }
  }


  //case to update work history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.experienceTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.experienceTimeline) {

    const response = await API_CALLS.reorderRecord(authToken, 'work_experience', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      const { work_history } = cvdata;
      const tempArray = [...work_history];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        work_history: tempArray
      }));
    }
  }

  //case to update editorial experiencec history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.editorialExperienceTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.editorialExperienceTimeline) {
    const response = await API_CALLS.reorderRecord(authToken, 'editorial_experience', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      const { editorial_experience } = cvdata;
      const tempArray = [...editorial_experience];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        editorial_experience: tempArray
      }));
    }
  }


  //case to update committee history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.committeeTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.committeeTimeline) {
    const response = await API_CALLS.reorderRecord(authToken, 'committees', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      const { committees } = cvdata;
      const tempArray = [...committees];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        committees: tempArray
      }));
    }
  }


  //case to update council membership history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.counciltimeline && destination.droppableId === DROPPABLE_TYPE_IDS.counciltimeline) {
    const response = await API_CALLS.reorderRecord(authToken, 'councils', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      const { councils } = cvdata;
      const tempArray = [...councils];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        councils: tempArray
      }));
    }
  }


  //case to update memberships history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.membershipsTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.membershipsTimeline) {

    const response = await API_CALLS.reorderRecord(authToken, 'memberships', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {

      const { memberships } = cvdata;
      const tempArray = [...memberships];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        memberships: tempArray
      }));
    }
  }


  //case to update award history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.awawardTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.awawardTimeline) {
    const response = await API_CALLS.reorderRecord(authToken, 'awards_honors', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {
      const { awards_honors } = cvdata;
      const tempArray = [...awards_honors];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        awards_honors: tempArray
      }));
    }
  }

  //case to update conferences history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.conferenceTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.conferenceTimeline) {
    const response = await API_CALLS.reorderRecord(authToken, 'conferences', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {

      const { conferences } = cvdata;
      const tempArray = [...conferences];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        conferences: tempArray
      }));
    }
  }

  //case to update Accreditation history after drag and drop
  else if (source.droppableId === DROPPABLE_TYPE_IDS.accreditationsExperienceTimeline && destination.droppableId === DROPPABLE_TYPE_IDS.accreditationsExperienceTimeline) {
    const response = await API_CALLS.reorderRecord(authToken, 'accreditations_experience', draggableId, destination.index)
    if (response.severity === RESPONSE_SEVERITY.SUCCESS) {

      const { accreditations_experience } = cvdata;
      const tempArray = [...accreditations_experience];
      const deletedItem = tempArray.splice(source.index, 1);
      tempArray.splice(destination.index, 0, ...deletedItem);
      updateCVData(prevCVData => ({
        ...prevCVData,
        accreditations_experience: tempArray
      }));
    }
  }

}