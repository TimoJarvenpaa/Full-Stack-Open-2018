import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }
    
  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

const Kurssi = ({ kurssi }) => {
    return (
      <div>
        <Otsikko nimi={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
      </div>
    )
}

const Otsikko = ({ nimi }) => {
    return (
      <div>
        <h1>{nimi}</h1>
      </div>
    )
}

const Osa = ({ osa }) => {
    return (
      <p>{osa.nimi} {osa.tehtavia}</p>
    )
}

const Sisalto = ({osat}) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa} />)}  
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)