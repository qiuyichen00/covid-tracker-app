import React from 'react';

import { Cards, Chart,  CountryPicker } from './components';
import styles from './App.module.css'
import { fetchData } from './api'
import coronaImage from './images/image.png'
class App extends React.Component{
    state = {
        data: {},
        country: '',
    }

    /* fetch data (delegate using api and function in api/index.js) */
    async componentDidMount() {
        //fetch covid data from api
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        
        //fetch the data
        const fetchedData = await fetchData(country);
        //set the state
        this.setState({ data: fetchedData, country: country });
    }


    render(){
        const { data, country } = this.state;//equivalent to const date = this.state.data
        return (
            
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" /> 
                <Cards data={data} />
                <br></br>
                <br></br>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;