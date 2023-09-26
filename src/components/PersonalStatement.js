import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function PersonalStatement({ isPersonalStatementEditModeOn, personal_statement, deletePersonalStatement, setIsPersonalStatementEditModeOn, }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{
            display: isPersonalStatementEditModeOn ? 'none' : 'flex',
            flexDirection: 'column',
            width: '100%',
        }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="personal-statement-content"
                    id="personal-statement-content"
                >
                    <Box id='personal_statement' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Typography variant="h6">
                            Personal Statement
                        </Typography>
                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>
                            <Tooltip sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }} title='Delete Personal Statement'>
                                <IconButton onClick={deletePersonalStatement}>
                                    <ClearOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            {!expanded &&
                                <Tooltip title='expand personal statement'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse personal statement'>
                                    <IconButton onClick={() => setExpanded(false)}>
                                        <KeyboardDoubleArrowUpIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        </Box>

                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ padding: 2, fontStyle: 'italic' }} variant='subtitle1'><q onDoubleClick={() => setIsPersonalStatementEditModeOn(true)}> {personal_statement} </q></Typography>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}