import React, { useState } from 'react';

const StatisticLine = ({ text, value, symbol }) => <tr><td>{text}</td><td>{value}{symbol}</td></tr>

const Statistics = ({ good, neutral, bad, allClicks }) => {
  if(allClicks > 0){
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={allClicks} />
          <StatisticLine text="average" value={(good - bad) / allClicks} />
          <StatisticLine text="positive" value={100 * (good / allClicks)} symbol="%"/>
        </tbody>
      </table>
    );
  } else{
    return (
      <div>
        <p>No feedback given</p>
      </div>
      )
  }
}

const Button = ({handleClick, target, text}) => <button onClick={() => handleClick(target + 1)}>{text}</button>
// const Button = ({handler, target, text}) => <button onClick={HandleClick(handler, target)}>{text}</button>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAllClicks(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllClicks(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAllClicks(allClicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick}text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  );
}

export default App;
