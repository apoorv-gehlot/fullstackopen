const PersonForm = ({ newPerson, addPerson, handleAddName, handleAddNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <p>
                    name:
                    <input value={newPerson.name}
                        onChange={handleAddName} />
                </p>

                <p>
                    number:
                    <input value={newPerson.number} onChange={handleAddNumber} />
                </p>

            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;