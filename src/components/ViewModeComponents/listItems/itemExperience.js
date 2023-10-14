import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';
import _ from 'lodash';
import { Box } from '@mui/material';

export default function ItemExperience({ work_experience }) {
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
        boxShadow: isMouseOver ? 1 : 0,
        borderRadius: isMouseOver ? 1 : 0,
        p: 1,
      }}
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
          {work_experience.start_date
            ? formatDate(work_experience.start_date)
            : null}{' '}
          {work_experience.isContinue
            ? ' - continue'
            : work_experience.end_date
            ? ' - ' + formatDate(work_experience.end_date)
            : null}
        </Typography>

        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
          {capitalizeWords(work_experience.position_designation)}
          {work_experience.employer
            ? ', ' + capitalizeWords(work_experience.employer)
            : null}
          {work_experience.city
            ? ', ' + capitalizeWords(work_experience.city)
            : null}
          {work_experience.country
            ? `, ${work_experience.country.label}`
            : null}
        </Typography>

        {!_.isEmpty(work_experience.duties_responsibilities) && (
          <Typography variant="body2" gutterBottom>
            <i>
              <b>Duties & Responsibilities</b>
            </i>
            <br></br>
            {work_experience.duties_responsibilities}
          </Typography>
        )}

        {!_.isEmpty(work_experience.achievements) && (
          <Typography variant="body2" gutterBottom>
            <i>
              <b>Achievements </b>
            </i>
            <br></br>
            <pre style={{ fontFamily: 'inherit' }}>
              {work_experience.achievements}
            </pre>
          </Typography>
        )}
      </Box>
    </Box>
  );
}
