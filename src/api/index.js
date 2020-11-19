
import axios from 'axios';
//axios is used to make api request

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try{
        const { data } = await axios.get(changeableUrl);
        /* this is the same as 
        const response = await axios.get(url);
        const data = response.data
        because we onoly want the data part of the response
        */
        const modified_data = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        return modified_data;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

        /* sort the data ordered by date */
        let res = data.sort((a, b) => a.date - b.date);

        /* Only use the positive, recovered, death, and date property */
        res =  res.map(({ positive, recovered, death, dateChecked }) => ({ confirmed: positive, recovered: recovered, deaths: death, date: dateChecked }));
        return res;
    }
    catch(error){
        console.log(error);
    }

}


export const fetchCountries = async() => {
    try{
        //get a list of countries
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }
    catch (error) {
        console.log(error);
    }
}