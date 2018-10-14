import React from 'react';
import Person from './components/Person';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: this.state.newName,
      }
    
      const persons = this.state.persons.concat(personObject)
    
      this.setState({
        persons,
        newName: ''
    })
  }

  handleFormChange = (event) => {
    this.setState({ newName: event.target.value })
}

  render() {
    return (
      <div>
        debug: {this.state.newName}
        
        <h2>Puhelinluettelo</h2>

        <form onSubmit={this.addPerson}>
          <div>
            nimi:
              <input
                value={this.state.newName} 
                onChange={this.handleFormChange}
              />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>

        <table>
          <tbody>
            {this.state.persons.map(person => <Person key={person.name} person={person} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App