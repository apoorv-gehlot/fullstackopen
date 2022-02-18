import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [searchByName, setSearchByName] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(data => {
        console.log(data)
        setPersons(data)
      }).catch(error => notify(error, 'error'))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newPerson.name)

    if (existing) {
      const confirmation = window.confirm(`${existing.name} already in phonebook, replace the old number with new one?`)
      if (confirmation) {
        personService.update(existing.id, { ...existing, number: newPerson.number })
          .then(responsePerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : responsePerson))
            setNewPerson({
              name: '',
              number: ''
            })
            notify('Person number updated successfully!', 'success')
          }).catch((error) => {
            console.log('Error while updating number')
            notify(error, 'error')
          })
      }
    } else {
      personService.create({ ...newPerson })
        .then(newlyAdded => {
          setPersons(persons.concat(newlyAdded))
          setNewPerson({
            name: '',
            number: ''
          })
          notify('Person added successfully!', 'success')
        }).catch((error) => {
          console.log('Error while saving new person')
          console.log(error)
          notify(error, 'error')
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
          notify('Person deleted successfully!', 'success')
        }).catch((error) => {
          setPersons(persons.filter(p => p.id !== id))
          console.log('Error while deleting person')
          notify(error, 'error')
        })
    }
  }

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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

      <Notification notification={notification} />

      <h2>Add a new</h2>
      <PersonForm newPerson={newPerson} addPerson={addPerson} handleAddName={handleAddName} handleAddNumber={handleAddNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchByName={searchByName} deletePerson={deletePerson} />

    </div>
  )
}

export default App