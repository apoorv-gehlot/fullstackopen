import React, { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// function getMaxVotes(arr){
//   return Math.max(arr)
// }

function getMaxVotesIndex(arr){
  return arr.indexOf(Math.max(...arr))
}

function handleVotes(target, selected, setMaxVoted){
  let duplicate = [...target]
  duplicate[selected] += 1

  setMaxVoted(getMaxVotesIndex(duplicate))

  return duplicate
}

const Display = ({text}) => <h1>{text}</h1>

function App() {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const anecdotesLength = anecdotes.length
  const points = new Array(anecdotesLength).fill(0)

  const [selected, setSelected] = useState(0)
  const [copy, setCopy] = useState(points)
  const [maxVoted, setMaxVoted] = useState(0)

  return (
    <div>
      <Display text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {copy[selected]} votes.</p>

      <button onClick={() => setCopy(handleVotes(copy, selected, setMaxVoted))}>vote</button>
      <button onClick={() => setSelected(getRandomInt(anecdotesLength))} >next anecdote</button>

      <Display text="Anecdote with most votes"/>
      <p>{anecdotes[maxVoted]}</p>
      <p>has {copy[maxVoted]} votes.</p>
    </div>
  );
}

export default App;
