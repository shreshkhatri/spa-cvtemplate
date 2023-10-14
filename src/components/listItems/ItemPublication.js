import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const _ = require('lodash');
import { formatHarvardAuthors } from '@/assets/utilityFunctions';

export default function ItemPublication({
  publication,
  deletePublication,
  openFormForPublicationEdit,
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
        {publication.authors.length !== 0 && (
          <Typography display="inline">
            {formatHarvardAuthors(publication.authors)}
          </Typography>
        )}
        {publication.publication_date ? (
          <Typography display="inline" sx={{ fontWeight: 'bold' }}>
            {' '}
            ( {publication.publication_date.substring(0, 4)} ){' '}
          </Typography>
        ) : null}
        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
          {' '}
          {publication.title}{' '}
        </Typography>
        {!_.isEmpty(publication.page_range) ? (
          <Typography display="inline" sx={{ fontStyle: 'italic' }}>
            {' '}
            , pages {publication.page_range}
          </Typography>
        ) : null}
        {!_.isEmpty(publication.publication_event) ? (
          <Typography display="inline">
            , {publication.publication_event}
          </Typography>
        ) : null}

        {!_.isEmpty(publication.publication_venue) ? (
          <Typography
            display="inline"
            sx={{ fontStyle: 'italic' }}
            gutterBottom
          >
            {' '}
            , Venue: {publication.publication_venue}
          </Typography>
        ) : null}
        {!_.isEmpty(publication.edition_volume) ? (
          <Typography
            display="inline"
            sx={{ fontStyle: 'italic' }}
            gutterBottom
          >
            {' '}
            , Edition - {publication.edition_volume}
          </Typography>
        ) : null}
        {!_.isEmpty(publication.DOI) ? (
          <Typography sx={{ fontStyle: 'italic' }} gutterBottom>
            DOI - {publication.DOI}
          </Typography>
        ) : null}
        {!_.isEmpty(publication.publication_url) ? (
          <Typography sx={{ fontStyle: 'italic' }} gutterBottom>
            Available On - {publication.publication_url}
          </Typography>
        ) : null}

        {!_.isEmpty(publication.abstract) ? (
          <Typography variant="body2">
            {' '}
            <span style={{ paddingTop: 2, fontStyle: 'italic' }}>
              Abstract
            </span>{' '}
            <br></br>
            {publication.abstract}
          </Typography>
        ) : (
          ''
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
          onClick={() => openFormForPublicationEdit(publication._id)}
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
          onClick={() => deletePublication(publication._id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
