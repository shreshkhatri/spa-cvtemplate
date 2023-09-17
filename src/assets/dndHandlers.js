import { DROPPABLE_TYPE_IDS } from "@/data/data";

/*************************************** IMPLMENTATION FOR onDragEnd OPERATION ***********************************/

export function onDragEndHndler(result,cvdata,updateCVData) {

    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    console.log(result)


    //case to update education history after drag and drop

    if (source.droppableId === DROPPABLE_TYPE_IDS.educationTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.educationTimeline){

        const {education_history} = cvdata;
        const tempArray = [...education_history];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            education_history: tempArray
          }));
    }


    //case to update project history after drag and drop
    else if (source.droppableId === DROPPABLE_TYPE_IDS.projectTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.projectTimeline){

        const {projects} = cvdata;
        const tempArray = [...projects];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            projects: tempArray
          }));
    }


    //case to update work history after drag and drop
    else if (source.droppableId === DROPPABLE_TYPE_IDS.experienceTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.experienceTimeline){

        const {work_history} = cvdata;
        const tempArray = [...work_history];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            work_history: tempArray
          }));
    }

     //case to update editorial experiencec history after drag and drop
     else if (source.droppableId === DROPPABLE_TYPE_IDS.editorialExperienceTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.editorialExperienceTimeline){

        const {editorial_experience} = cvdata;
        const tempArray = [...editorial_experience];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            editorial_experience: tempArray
          }));
    }


     //case to update committee history after drag and drop
     else if (source.droppableId === DROPPABLE_TYPE_IDS.committeeTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.committeeTimeline){

        const {committees} = cvdata;
        const tempArray = [...committees];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            committees: tempArray
          }));
    }


     //case to update council membership history after drag and drop
     else if (source.droppableId === DROPPABLE_TYPE_IDS.counciltimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.counciltimeline){

        const {councils} = cvdata;
        const tempArray = [...councils];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            councils: tempArray
          }));
    }

    
    //case to update memberships history after drag and drop
    else if (source.droppableId === DROPPABLE_TYPE_IDS.membershipsTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.membershipsTimeline){

        const {memberships} = cvdata;
        const tempArray = [...memberships];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            memberships: tempArray
          }));
    }


    //case to update award history after drag and drop
    else if (source.droppableId === DROPPABLE_TYPE_IDS.awawardTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.awawardTimeline){

        const {awards_honors} = cvdata;
        const tempArray = [...awards_honors];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            awards_honors: tempArray
          }));
    }
    
    //case to update conferences history after drag and drop
    else if (source.droppableId === DROPPABLE_TYPE_IDS.conferenceTimeline &&  destination.droppableId === DROPPABLE_TYPE_IDS.conferenceTimeline){

        const {conferences} = cvdata;
        const tempArray = [...conferences];
        const deletedItem = tempArray.splice(source.index, 1);
        tempArray.splice(destination.index, 0, ...deletedItem);
        updateCVData(prevCVData => ({
            ...prevCVData,
            conferences: tempArray
          }));
    }

  }