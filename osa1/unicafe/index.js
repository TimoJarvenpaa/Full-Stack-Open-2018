import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0,
            painotettuSumma: 0,
            palautteitaYhteensä: 0
        }
    }

    klik = (id, value) => () => {
            this.setState({
                [id] : this.state[id] + 1,
                painotettuSumma : this.state.painotettuSumma + value,
                palautteitaYhteensä : this.state.palautteitaYhteensä + 1
            })
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <Button
                        handleClick={this.klik('hyvä', 1)}
                        text="hyvä"
                    />
                    <Button
                        handleClick={this.klik('neutraali', 0)}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.klik('huono', -1)}
                        text="huono"
                    />
                </div>
                <Statistics state={this.state} />
            </div>
        )
    }
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td> {text} </td>
            <td> {value} </td>
        </tr>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ state }) => {
    if (state.palautteitaYhteensä === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }
    return (
        <div>
            <h1>statistiikka</h1>
            <table>
                <tbody>
                    <Statistic text="hyvä" value={state.hyvä} />
                    <Statistic text="neutraali" value={state.neutraali} />
                    <Statistic text="huono" value={state.huono} />
                    <Statistic text="keskiarvo" value={laskeKeskiarvo(state.painotettuSumma, state.palautteitaYhteensä)} />
                    <Statistic text="positiivisia" value={laskePositiivistenOsuus(state.hyvä, state.palautteitaYhteensä)} />
                </tbody>
            </table>
        </div>
    )
}

const laskeKeskiarvo = function(summa, lkm) {
    return (summa / lkm).toFixed(1)
}

const laskePositiivistenOsuus = function(hyviä, yhteensä) {
    return ((hyviä / yhteensä) * 100).toFixed(1) + ' %'
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)