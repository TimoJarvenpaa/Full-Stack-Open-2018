import React from 'react';
import personService from './services/persons';
import Person from './components/Person';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
    }

      if (this.state.persons.filter(person => person.name === personObject.name).length === 0){
    
        personService
          .create(personObject)
          .then(newPerson => {
            this.setState({
              persons: this.state.persons.concat(newPerson),
              newName: '',
              newNumber: ''
            })
          })
      }
      
      else {
        if (window.confirm(personObject.name + ' löytyy jo puhelinluettelosta. Korvataanko vanha numero?')){
          const id = this.state.persons.find(p => p.name === personObject.name).id
          personService
            .update(id, personObject)
            .then(changedPerson => {
              const persons = this.state.persons.filter(p => p.id !== id)
              this.setState({
                persons: persons.concat(changedPerson)
              })
            })
            .catch(error => {
              alert(`${personObject.name} on jo valitettavasti poistettu palvelimelta`)
              this.setState({ persons: this.state.persons.filter(p => p.id !== id) })
            })
        } else {
          this.setState({
            newName: '',
            newNumber: ''
          })
        }
      }
  }

  removePerson = (id) => () => {
    const p = this.state.persons.find(p => p.id === id)
    if (window.confirm(`Poistetaanko ${p.name}?`)){
      personService
        .remove(id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== id)
          })
        })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <FilterDisplayedNames App={this} />

        <h2>Lisää uusi</h2>
        <AddNewPerson App={this} />

        <h2>Numerot</h2>
        <CreateNumbersTable App={this} />
      </div>
    )
  }
}

const AddNewPerson = ({App}) => {
  return (
    <form onSubmit={App.addPerson}>
      <div>
        nimi:
          <input
            value={App.state.newName} 
            onChange={App.handleNameChange}
          />
      </div>
      <div>
        numero:
          <input
            value={App.state.newNumber} 
            onChange={App.handleNumberChange}
          />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const FilterDisplayedNames = ({App}) => {
  return (
    <div>
      rajaa näytettäviä:
        <input 
          value={App.state.filter} 
          onChange={App.handleFilterChange}
        />
    </div>
  )
}

const CreateNumbersTable = ({App}) => {
  return (
    <table>
      <tbody>
        {App.state.persons
          .filter(person => person.name.toUpperCase().includes(App.state.filter.toUpperCase()))
          .map(person =>
            <Person 
              key={person.name}
              person={person}
              App={App}
            />
          )
        }
      </tbody>
    </table>
  )
}

export default App