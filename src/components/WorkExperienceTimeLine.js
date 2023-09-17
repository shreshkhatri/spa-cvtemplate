import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ItemExperience from './listItems/itemExperience';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DROPPABLE_TYPE_IDS } from '@/data/data';


export default function WorkExperienceTimeLine({ work_history, deleteWorkExperience, openFormForWorkExperienceEdit }) {

  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '20vh'
      }}>
        {
          work_history.length != 0 &&
          <Droppable droppableId={DROPPABLE_TYPE_IDS.experienceTimeline}>
            {
              (provided, snapshot) => (
                <Timeline
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 2,
                    },
                    border: snapshot.isDraggingOver ? 1 : 0,
                    borderColor: snapshot.isDraggingOver ? '#f9f6ee' : null,
                    boxShadow: snapshot.isDraggingOver ? 1 : 0,
                    borderRadius: snapshot.isDraggingOver ? 2 : 0,
                  }}
                >

                  {
                    work_history.map((work_experience, index) => {
                      return <Draggable draggableId={work_experience.employmentID} key={work_experience.employmentID} index={index}>
                          {(provided, snapshot) => (
                            <TimelineItem ref={provided.innerRef} key={work_experience.employmentID} {...provided.draggableProps} {...provided.dragHandleProps}>

                              <TimelineSeparator>
                                <TimelineDot color='success' />
                                {(work_history.length - 1) !== index && <TimelineConnector />}
                              </TimelineSeparator>
                              <TimelineContent sx={{ paddingBottom: 1 }}>
                                <ItemExperience work_experience={work_experience} deleteWorkExperience={deleteWorkExperience} openFormForWorkExperienceEdit={openFormForWorkExperienceEdit} isDragging={snapshot.isDragging}/>
                              </TimelineContent>
                            </TimelineItem>
                          )}
                        </Draggable>
                    })
                  }
                  {provided.placeholder}
                </Timeline>
                )}

          </Droppable>
        }
        {
          work_history.length == 0 && <Typography align='center'>No experiences added yet. <br></br> Start adding new qualification by clicking link above.</Typography>
        }
      </Box>
  );
}