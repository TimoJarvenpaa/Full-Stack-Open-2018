import React from 'react';
import Person from './components/Person';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
    }

      if (this.state.persons.filter(person => person.name === personObject.name).length === 0){
        const persons = this.state.persons.concat(personObject)
    
        this.setState({
          persons,
          newName: '',
          newNumber: ''
        })
      }
      
      else {
        alert(personObject.name + ' löytyy jo puhelinluettelosta')
        this.setState({
          newName: '',
          newNumber: ''
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
          .map(person => <Person key={person.name} person={person} />)
        }
      </tbody>
    </table>
  )
}

export default App