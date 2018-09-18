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
        const keskiarvo = laskeKeskiarvo(this.state.painotettuSumma, this.state.palautteitaYhteensä)
        const positiivisia = (this.state.hyvä / this.state.palautteitaYhteensä) * 100
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
                <h1>statistiikka</h1>
                <Display text="hyvä" value={this.state.hyvä} />
                <Display text="neutraali" value={this.state.neutraali} />
                <Display text="huono" value={this.state.huono} />
                <Display text="keskiarvo" value={keskiarvo.toFixed(1)} />
                <div>positiivisia {positiivisia.toFixed(1)} %</div>
            </div>
        )
    }
}

const Display = ({ text, value }) => <div>{text} {value}</div>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const laskeKeskiarvo = function(summa, lkm) {
    return summa / lkm
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)