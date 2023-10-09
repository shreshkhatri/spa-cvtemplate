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


export default function CareerSummary({career_summary }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }} onMouseEnter={() => { setIsMouseOver(true) }} onMouseLeave={() => setIsMouseOver(false)}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="career-summary-content"
                    id="career-summary-content"
                >
                    <Box id='career_summary' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Typography variant="h6">
                            Career Summary
                        </Typography>
                        <Box sx={{ visibility: isMouseOver ? 'visible' : 'hidden' }}>

                            {!expanded &&
                                <Tooltip title='expand career summary'>
                                    <IconButton onClick={() => setExpanded(true)}>
                                        <KeyboardDoubleArrowDownIcon />
                                    </IconButton>
                                </Tooltip>
                            }

                            {expanded &&
                                <Tooltip title='collapse career summary'>
                                    <IconButton onClick={() => setExpanded(false)}>
                                        <KeyboardDoubleArrowUpIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        </Box>

                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ padding: 2 }} variant='subtitle2' ><p >{career_summary}</p></Typography>
                </AccordionDetails>
                </Accordion>
        </Box>

    );
}