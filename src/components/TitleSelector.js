import {  useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TITLES } from '@/data/data';

export default function TitleSelector({ title, setTitle }) {

    const [titles, setTitles] = useState(TITLES)

    const handleChange = (e, newvalue) => { setTitle(newvalue) };
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ flexGrow: 1 }}
            options={titles}
            autoHighlight
            size='small'
            required
            fullWidth
            value={title}
            onChange={handleChange}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a Title"
                    fullWidth
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}

                />
            )}
        />
    );
}

