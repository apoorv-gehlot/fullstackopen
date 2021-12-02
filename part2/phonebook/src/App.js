import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [searchByName, setSearchByName] = useState('')

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)

        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const duplicates = persons.filter(p => p.name === newPerson.name)

    if (duplicates.length) {
      alert(newPerson.name + ' is already added to phonebook')
      return;
    }

    const personObject = {
      name: newPerson.name,
      number: newPerson.number
    }
    setPersons(persons.concat(personObject))
    setNewPerson({
      name: '',
      number: ''
    })
  }

  const handleAddName = (event) => {
    event.preventDefault()

    let personObject = {}
    personObject.name = event.target.value
    personObject.number = newPerson.number

    setNewPerson(personObject)
  }

  const handleAddNumber = (event) => {
    event.preventDefault()
    let personObject = {}
    personObject.name = newPerson.name
    personObject.number = event.target.value

    setNewPerson(personObject)
  }

  const handleNameFilter = (event) => {
    event.preventDefault()
    setSearchByName(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter searchByName={searchByName} handleNameFilter={handleNameFilter} />

      <h2>Add a new</h2>
      <PersonForm newPerson={newPerson} addPerson={addPerson} handleAddName={handleAddName} handleAddNumber={handleAddNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchByName={searchByName} />

    </div>
  )
}

export default App