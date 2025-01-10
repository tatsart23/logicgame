import Timer from './components/Timer'
import Field from './components/Field'
import { useState } from 'react'

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [resetGame, setResetGame] = useState(false)

  const handleGameReset = () => {
    setIsRunning(false);
    setGameOver(false);
    setResetGame(true); // Trigger reset
    setTimeout(() => setResetGame(false), 0); // Ensure `resetGame` is re-triggerable
  };


  return (
    <>
    <div className="container mx-auto">
      <h1 className='text-xl font-bold text-red-500'>Kanoodle</h1>
      <Timer 
        seconds={120}
        setIsRunning={setIsRunning}
        gameOver={gameOver}
        setGameOver={setGameOver}
        handleGameReset={handleGameReset}
        resetGame={resetGame}
        isRunning={isRunning}
      />

      <Field 
        isRunning={isRunning}
        resetGame={resetGame}
        setGameOver={setGameOver}
      />
      </div>
    </>
  )
}

export default App
