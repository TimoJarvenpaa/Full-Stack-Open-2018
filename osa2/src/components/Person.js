import React from 'react'

const Person = ({ person, App}) => {
  return (
      <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={App.removePerson(person.id)}>poista</button></td>
      </tr>
  )
}

export default Person