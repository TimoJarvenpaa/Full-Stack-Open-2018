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

    klikHyvä = () => {
        this.setState({
            hyvä : this.state.hyvä + 1,
            painotettuSumma : this.state.painotettuSumma + 1,
            palautteitaYhteensä : this.state.palautteitaYhteensä + 1
        })
    }

    klikNeutraali = () => {
        this.setState({
            neutraali : this.state.neutraali + 1,
            painotettuSumma : this.state.painotettuSumma + 0,
            palautteitaYhteensä : this.state.palautteitaYhteensä + 1
        })
    }

    klikHuono = () => {
        this.setState({
            huono : this.state.huono + 1,
            painotettuSumma : this.state.painotettuSumma - 1,
            palautteitaYhteensä : this.state.palautteitaYhteensä + 1
        })
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <Button
                        handleClick={this.klikHyvä}
                        text="hyvä"
                    />
                    <Button
                        handleClick={this.klikNeutraali}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.klikHuono}
                        text="huono"
                    />
                </div>
                <Statistics state={this.state} />
            </div>
        )
    }
}

const Statistic = ({ text, value }) => <div>{text} {value}</div>

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
            <Statistic text="hyvä" value={state.hyvä} />
            <Statistic text="neutraali" value={state.neutraali} />
            <Statistic text="huono" value={state.huono} />
            <Statistic text="keskiarvo" value={laskeKeskiarvo(state.painotettuSumma, state.palautteitaYhteensä)} />
            <Statistic text="positiivisia" value={laskePositiivistenOsuus(state.hyvä, state.palautteitaYhteensä)} />
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
