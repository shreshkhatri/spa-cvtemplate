import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { getAllAuthorsName, getYear } from '@/assets/utilityFunctions';
import _ from 'lodash';
import { Box } from '@mui/material';

export default function ItemConference({ conference }) {
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
        <Typography display="inline">
          {getAllAuthorsName(conference.authors)}
        </Typography>
        {conference.start_date ? (
          <Typography display="inline">
            {' '}
            ( {getYear(conference.start_date)} )
          </Typography>
        ) : null}
        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
          {' '}
          {conference.title}{' '}
        </Typography>
        {!_.isEmpty(conference.name) ? (
          <Typography display="inline" sx={{ fontStyle: 'italic' }}>
            {' '}
            , {conference.name}{' '}
          </Typography>
        ) : null}
        {!_.isEmpty(conference.city) ? (
          <Typography display="inline" sx={{ fontStyle: 'italic' }}>
            {' '}
            , {conference.city}{' '}
          </Typography>
        ) : null}
        {conference.country ? (
          <Typography display="inline" sx={{ fontStyle: 'italic' }}>
            {' '}
            , {conference.country.label}{' '}
          </Typography>
        ) : null}
        {!_.isEmpty(conference.page_range) ? (
          <Typography display="inline">
            {' '}
            , pages {conference.page_range}{' '}
          </Typography>
        ) : null}

        {!_.isEmpty(conference.summary) ? (
          <Typography variant="body2" sx={{ paddingTop: 1 }}>
            {conference.summary}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
