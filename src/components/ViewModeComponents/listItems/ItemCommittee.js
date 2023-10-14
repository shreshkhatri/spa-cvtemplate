import Box from '@mui/material/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';

export default function ItemCommittee({ committee }) {
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
          {committee.start_date ? formatDate(committee.start_date) : null}{' '}
          {committee.isContinue
            ? ' - continue'
            : committee.end_date
            ? ' - ' + formatDate(committee.end_date)
            : null}
        </Typography>

        <Typography display="inline">
          {capitalizeWords(committee.designation)} ,{' '}
          {capitalizeWords(committee.name)}
          {!_.isEmpty(committee.city)
            ? ' ,' + capitalizeWords(committee.city)
            : null}
          {!_.isNull(committee.country) ? ' ,' + committee.country.label : null}
        </Typography>
      </Box>
    </Box>
  );
}
