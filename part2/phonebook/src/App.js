import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [searchByName, setSearchByName] = useState('')

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