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

        <div>
          rajaa näytettäviä:
            <input 
              value={this.state.filter} 
              onChange={this.handleFilterChange}
            />
        </div>

        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi:
              <input
                value={this.state.newName} 
                onChange={this.handleNameChange}
              />
          </div>
          <div>
            numero:
              <input
                value={this.state.newNumber} 
                onChange={this.handleNumberChange}
              />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>

        <table>
          <tbody>
            {this.state.persons
              .filter(person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()))
              .map(person => <Person key={person.name} person={person} />)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App