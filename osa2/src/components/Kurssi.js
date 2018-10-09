import React from 'react'

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

const Sisalto = ({ osat }) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
      {<Yhteensa osat={osat} />}
    </div>
  )
}

const Yhteensa = ({ osat }) => {
    const tehtavia = osat.reduce((acc, currValue) => {
        return acc + currValue.tehtavia;
    }, 0);

    return (
        <p>yhteensä {tehtavia} tehtävää</p>
    )
}

export default Kurssi