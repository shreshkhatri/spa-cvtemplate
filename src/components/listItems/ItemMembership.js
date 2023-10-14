import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { formatDate, capitalizeWords } from '@/assets/utilityFunctions';

export default function ItemMembership({
  membership,
  deleteMembership,
  openFormForMembershipEdit,
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
          onClick={() => openFormForMembershipEdit(membership._id)}
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
          onClick={() => deleteMembership(membership._id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
