import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PersonalStatementForm({ personal_statement,updatePersonalStatement,setIsPersonalStatementEditModeOn }) {

    const [personalStatement, setPersonalStatement] = useState(personal_statement);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        updatePersonalStatement(personalStatement)
        setIsPersonalStatementEditModeOn(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingX: 5
        }}
            component='form' noValidate='false'
        >
            <Typography variant='h6' >Personal Statement</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                },
                width: 'inherit',
                columnGap: 2,
                rowGap: 1,
                paddingY: 2
            }}>
                <TextField
                    autoComplete="off"
                    name="inputPersonalStatement"
                    required
                    fullWidth
                    id="inputPersonalStatement"
                    label="Personal Statement"
                    size='small'
                    value={personalStatement}
                    autoFocus
                    onChange={e => setPersonalStatement(e.target.value)}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center'
            }}>
                <Button
                    size='small'
                    variant="outlined"
                    color='inherit'
                    onClick={() => setIsPersonalStatementEditModeOn(false)}
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    size='small'
                    color='success'
                    variant='outlined'
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Box>


        </Box>
    );
}