import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0
        }
    }

    klikHyvä = () => this.setState({ hyvä : this.state.hyvä + 1})

    klikNeutraali = () => this.setState({ neutraali : this.state.neutraali + 1})

    klikHuono = () => this.setState({ huono : this.state.huono + 1})

    
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
                <h1>statistiikka</h1>
                <Display text="hyvä" value={this.state.hyvä} />
                <Display text="neutraali" value={this.state.neutraali} />
                <Display text="huono" value={this.state.huono} />
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

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
