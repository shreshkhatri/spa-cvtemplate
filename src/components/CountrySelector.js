import { useEffect, useState } from 'react'
import { ENDPOINT } from '@/data/endpoints';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CountrySelector({ country, setCountry }) {

    const [countries, setCountries] = useState([])

    useEffect(() => {
        async function getCountriesList() {
            await fetch(ENDPOINT.COUNTRIES_LIST, {
                method: "GET",
                redirect: 'follow',
                headers: {
                    'Accept': 'application/json',
                },
            }).then(async (response) => {
                console.log(response)
                var json = await response.json()
                return { status: response.status, ...json }
            }).then(response => {
                setCountries(response.countries)
            }).catch(error => {
                console.log(error)
            });
        }
        getCountriesList();
    }, [])

    const handleChange = (e, newvalue) => { setCountry(newvalue) };
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ flexGrow: 1 }}
            options={countries}
            autoHighlight
            size='small'
            required
            value={country}
            onChange={handleChange}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.label} ({option.code}) +{option.phone}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}

                />
            )}
        />
    );
}

