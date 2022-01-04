import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WarningMessage = ({ showWarning, message }) => {
  if (!showWarning)
    return null

  return (
    <p>{message}</p>
  )
}

const CountryDetails = ({country}) =>{
  if(country.name === undefined)
    return null
  
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <div>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={country.flag} alt="country flag" height="100" width="100" />
        {
          country.weather !== undefined ?
            <div>
              <p>temperature {country.weather.temperature}</p>
              <p>wind {country.weather.wind}</p>
            </div>
          : null
        }
      </div>
      
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([
    {
      name: undefined
    }
  ])
  const [viewCountry, setViewCountry] = useState({ name: undefined })
  const [search, setSearch] = useState('')
  const [lastSearch, setLastSearch] = useState('')
  const [showLimitError, setLimitError] = useState(false)

  console.log(process.env.REACT_APP_API_KEY)

  useEffect(() => {
    // Return if there is no value in the search field or last request matches the current request
    // lastSearch will prevent useEffect from going into infinite loop.
    if (!search || search === lastSearch)
      return

    axios
      .get("https://restcountries.com/v2/name/" + search)
      .then(response => {
        console.log(response)

        if (response.data.length > 10) {
          console.log('size of response: ' + response.data.length)
          setLimitError(true)
        } else {
          setLimitError(false)
          setCountries(response.data)
        }
      })

    setLastSearch(search)
  }, [search, lastSearch])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const getWeatherReport = (country) => {
    const name = country.name
    axios
    .get("https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=a8de710ec75c0c03738a1e3bf5009aca")
    .then(response =>{
      const weatherObject = {}
      weatherObject.temperature = response.data.main.temp
      weatherObject.wind = response.data.wind.speed

      const countryObject = country
      countryObject.weather = weatherObject

      setViewCountry(countryObject)
    })

    // setViewCountry(country)
  }

  return (
    <div>
      find countries:
      <input value={search} onChange={handleSearch} />

      <WarningMessage showWarning={showLimitError} message={'To many matches, specify another filter.'} />

      {
        // check if limit error message is hidden and countries size is greater than 1
        !showLimitError && countries.length > 1 && viewCountry.name ===undefined?
          <ul>
            {countries.filter(country => country.name !== undefined)
              .map(country =>
                <li key={country.name}>{country.name} <button onClick={() => getWeatherReport(country)}>show</button></li>
              )}
          </ul>
          :
            <div>
              {
                // display country details is countries array has only one object
                countries.length === 1 && viewCountry.name === undefined?
                  countries
                  .filter(country => country.name !==undefined)
                  .map(country =>  <CountryDetails key={country.name} country={country} />)
                  : //display country details when button is clicked
                  viewCountry.name !== undefined ?
                    <div>
                      <CountryDetails country={viewCountry} />
                      <button onClick={() => setViewCountry({})}>back</button>
                    </div>
                    :null
              }
            </div>
      }
    </div>
  );
}

export default App;
