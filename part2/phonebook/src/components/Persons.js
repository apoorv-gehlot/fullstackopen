import PersonDetails from "./PersonDetails"

const filterByName = (person, searchByName) => {
    if (!searchByName)
        return true

    return (person.name.toLowerCase().search(searchByName.toLowerCase()) > -1)
}

const Persons = ({ persons, searchByName, deletePerson }) => {
    return (
        <div>
            {
                persons
                    .filter(person => filterByName(person, searchByName))
                    .map(person => <PersonDetails key={!person.id ? person.name:person.id} person={person} deletePerson={deletePerson} />)
            }
        </div>
    )
}

export default Persons