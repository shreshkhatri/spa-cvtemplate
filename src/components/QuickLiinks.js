
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function QuickLiinks(props) {

    const targets = [...props.targets];
    
    targets.splice(0,1); //targets[0] is always basic information, which is at top and we dont need to scroll for this

    function scrollToTarget(targetID) {
        const targetSection = document.getElementById(targetID)
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <Box>

            <ButtonGroup sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} variant="text" aria-label="text button group">
                {targets.map(target => <Button sx={{color:'text.secondary'}} key={target} onClick={() => scrollToTarget(target)}>{target.replace(/_/g, ' ')}</Button>)}
            </ButtonGroup>
        </Box>
    );
}
