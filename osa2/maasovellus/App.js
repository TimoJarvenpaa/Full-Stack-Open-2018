import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  render() {
    return (
      <div>
        <FilterDisplayedCountries App={this} />
        <DisplayCountries App={this} />
      </div>
    )
  }
}

const FilterDisplayedCountries = ({App}) => {
  return (
    <div>
      find countries:
        <input 
          value={App.state.filter} 
          onChange={App.handleFilterChange}
        />
    </div>
  )
}

const DisplayCountries = ({App}) => {
  var countryObject = App.state.countries.filter(country => country.name.toUpperCase().includes(App.state.filter.toUpperCase()));

  if(countryObject.length >= 10){
    return <p>too many matches, please specify your filter</p>
  }

  if(countryObject.length === 1){
    return (
      <div>
        <h1>{countryObject.map(country => country.name + " " + country.nativeName)}</h1>
        <p>capital: {countryObject.map(country => country.capital)}</p>
        <p>population: {countryObject.map(country => country.population)}</p>
        <img src={countryObject.map(country => country.flag)} alt="a flag" height="200" width="300" />
      </div>
    )
  }
  
  else {
    return(
      <div>
        {countryObject
          .map(country => <p key={country.name}>{country.name}</p>)
        }
      </div>
    )
  }
}

export default App