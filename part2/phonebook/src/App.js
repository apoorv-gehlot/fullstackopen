import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [searchByName, setSearchByName] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(data => {
        console.log(data)
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newPerson.name)

    if (existing) {
      const confirmation = window.confirm(`${existing.name} already in phonebook, replace the old number with new one?`)
      if (confirmation) {
        personService.update(existing.id, { ...existing, number: newPerson.number }).
          then(responsePerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : responsePerson))
            setNewPerson({
              name: '',
              number: ''
            })
          }).catch(() => {
            console.log('Error while updating number')
          })
      }
    } else {
      // const personObject = {
      //   name: newPerson.name,
      //   number: newPerson.number
      // }

      personService.create({...newPerson}).
        then(newlyAdded => {
          setPersons(persons.concat(newlyAdded))
          setNewPerson({
            name: '',
            number: ''
          })
        }).catch(() => {
          console.log('Error while saving new person')
        })
    }

  }

  const deletePerson = (id) => {

    const personToDelete = persons.find(p => p.id === id)
    const confirmation = window.confirm(`Delete ${personToDelete.name}`)

    if (confirmation) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        }).catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          console.log('Error while deleting person')
        })
    }
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
      <Persons persons={persons} searchByName={searchByName} deletePerson={deletePerson} />

    </div>
  )
}

export default App