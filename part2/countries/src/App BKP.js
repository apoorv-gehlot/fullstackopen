import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SetDisplay = (props) => {
  if (props.countries.length === 1){
    return <DisplayCountry country={props.countries[0]} />
  }else
    return <DisplayCountries countries={props.countries} hideResult={props.showLimitError} viewCountry={props.viewCountry} setViewCountry={props.setViewCountry}/>
}

const WarningMessage = ({ showWarning, message }) => {
  if (!showWarning)
    return null

  return (
    <p>{message}</p>
  )
}

const DisplayCountry = ({ country }) => {

  if (country.name === undefined)
    return null
  console.log(country)
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={country.flag} alt="country flag" height="100" width="100" />
      </p>
    </div>
  )
}

const DisplayCountries = (props) => {
  if (props.hideResult)
    return null

  // const handleButtonClick = (country) =>{
  //   props.setViewCountry(country)
  // }
  
  return (
    <div>
        <ul>
        {props.countries.filter(country => country.name !== undefined)
          .map(country =>
            <li key={country.name}>{country.name} <button >show</button></li>
          )}
      </ul>
      
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([
    {
      name: undefined
    }
  ])
  const [viewCountry, setViewCountry] = useState({name: undefined})
  const [search, setSearch] = useState('')
  const [lastSearch, setLastSearch] = useState('')
  const [showLimitError, setLimitError] = useState(false)

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

  return (
    <div>
      find countries:
      <input value={search} onChange={handleSearch} />

      <WarningMessage showWarning={showLimitError} message={'To many matches, specify another filter.'} />

      <SetDisplay countries={countries} hideResult={showLimitError} viewCountry={viewCountry} setViewCountry={setViewCountry}/>
    </div>
  );
}

export default App;
