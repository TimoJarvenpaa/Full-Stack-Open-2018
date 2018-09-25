import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      pisteet: [0, 0, 0, 0, 0, 0],
      mostVotesIndex: 0
    }
  }

  next = () => {
      this.setState({
          selectedIndex : this.randomNumber(0, anecdotes.length - 1)
      })
  }

  vote = () => {
      const i = this.state.selectedIndex
      const kopio = [...this.state.pisteet]
      kopio[i] += 1
      this.setState({
          pisteet : kopio
      }, this.mostVotes )
  }

  randomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
  }

  mostVotes = () => {
    var k;
    var mostVotes = 0;
    for (k = 0; k < this.state.pisteet.length; k++) {
        if (this.state.pisteet[k] > this.state.pisteet[mostVotes]) {
            mostVotes = k
        }
    }
    this.setState({
        mostVotesIndex : mostVotes
    })
}

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selectedIndex]}</p>
        <p>has {this.state.pisteet[this.state.selectedIndex]} votes</p>
        <Button
            handleClick={this.vote}
            text="vote"
        />
        <Button
            handleClick={this.next}
            text="next anecdote"
        />
        <h1>anecdote with the most votes:</h1>
        <p>{this.props.anecdotes[this.state.mostVotesIndex]}</p>
        <p>has {this.state.pisteet[this.state.mostVotesIndex]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)