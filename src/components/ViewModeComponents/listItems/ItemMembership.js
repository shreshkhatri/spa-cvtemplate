import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';

export default function ItemMembership({ membership }) {
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
          {membership.start_date ? formatDate(membership.start_date) : null}{' '}
          {membership.isContinue
            ? ' - continue'
            : membership.end_date
            ? ' - ' + formatDate(membership.end_date)
            : null}
        </Typography>

        {!_.isEmpty(membership.membership_type) ? (
          <Typography display="inline" sx={{ fontWeight: 'bold' }}>
            {capitalizeWords(membership.membership_type)} ,
          </Typography>
        ) : null}
        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
          {' '}
          {capitalizeWords(membership.organization)}{' '}
        </Typography>
        {!_.isEmpty(membership.city) ? (
          <Typography display="inline">
            , {capitalizeWords(membership.city)}{' '}
          </Typography>
        ) : null}
        {!_.isNull(membership.country) ? (
          <Typography display="inline">
            , {membership.country.label}{' '}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
