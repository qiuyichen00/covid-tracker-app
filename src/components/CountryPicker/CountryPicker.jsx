import React, {useState, useEffect } from 'react';
import  { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css'
import  { fetchCountries } from '../../api';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetechedCountries] = useState([]);
    const initialOption = "";
    const [value, setValue] = useState(initialOption);
    useEffect(() => {
        const fetchAPI = async () => {
            setFetechedCountries(await fetchCountries());
        }
        fetchAPI();
    }, []);

    console.log(fetchedCountries);
    /*return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )*/

    return(
        <Autocomplete 
            value={value}
            onChange = {(e, newValue) => {
                setValue(newValue);
                handleCountryChange(newValue);
            } }
            id="country-select-demo"
            options={fetchedCountries}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Choose a country" variant="outlined" />}
        />
    );
}

export default CountryPicker;