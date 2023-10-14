import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';
import _ from 'lodash';
import { Box } from '@mui/material';

export default function ItemDegree({
  degree,
  deleteEducationDegree,
  openFormForDegreeEdit,
  isDragging,
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        alignItems: 'center',
        width: '100%',
        boxShadow: isMouseOver || isDragging ? 1 : 0,
        borderRadius: isMouseOver || isDragging ? 1 : 0,
        p: 1,
      }}
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
          {degree.start_date ? formatDate(degree.start_date) : null}{' '}
          {degree.isContinue
            ? ' - continue'
            : degree.end_date
            ? ' - ' + formatDate(degree.end_date)
            : null}
        </Typography>

        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
          {capitalizeWords(degree.degree)} ,{' '}
          {capitalizeWords(degree.institution)}
          {!_.isEmpty(degree.city) ? ', ' + capitalizeWords(degree.city) : null}
          {degree.country ? ', ' + degree.country.label : null}
        </Typography>

        {!_.isEmpty(degree.grade) && (
          <Typography
            variant="body2"
            display="inline"
            sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
          >
            {', '}
            {capitalizeWords(degree.grade)}
          </Typography>
        )}

        {!_.isEmpty(degree.course_summary) && (
          <Typography variant="body2" sx={{ paddingTop: 1 }} gutterBottom>
            {' '}
            <em>
              {' '}
              <strong> Summary</strong>{' '}
            </em>
            <br></br>
            {degree.course_summary}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          visibility: isMouseOver ? 'visible' : 'hidden',
        }}
      >
        <Button
          variant="text"
          sx={{
            fontWeight: '780',
            color: 'success.main',
            textDecoration: 'underline',
          }}
          size="small"
          onClick={() => openFormForDegreeEdit(degree._id)}
        >
          Edit
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: '780',
            color: 'error.main',
            textDecoration: 'underline',
          }}
          size="small"
          onClick={() => deleteEducationDegree(degree._id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
