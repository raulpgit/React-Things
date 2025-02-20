import './App.css'
import TicTacToe from '../components/TicTacToe'
import { useState } from 'react'
import {TURNSC4, TURNSTTT} from '../services/constants'

function App() {
  const [game, setGame] = useState('TicTacToe')
  
  const handleGameChange = () => {
    setGame(game === 'TicTacToe' ? 'Connect4' : 'TicTacToe')
  }

  return (
    <>
      <header>
        <button onClick={handleGameChange}>ChangeGame</button>
        <h1>{game}</h1>
      </header>
      <main>
        {game === 'TicTacToe' && <TicTacToe boardXSize={3} boardYSize={3} numberToWin={3} Gravity={false} TURNS={TURNSTTT}/>}
        {game === 'Connect4' && <TicTacToe boardXSize={7} boardYSize={6} numberToWin={4} Gravity={true} TURNS={TURNSC4}/>}
      </main>
    </>
  )
}

export default App



{/* <div>
  <a href="https://vite.dev" target="_blank">
    <img src={viteLogo} className="logo" alt="Vite logo" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
</div>
<h1>Vite + React</h1>
<div className="card">
  <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button>
  <p>
    Edit <code>src/App.jsx</code> and save to test HMR
  </p>
</div>
<p className="read-the-docs">
  Click on the Vite and React logos to learn more
</p> */}