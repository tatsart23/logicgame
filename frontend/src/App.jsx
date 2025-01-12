import { useState } from 'react';
import Timer from './components/Timer';
import Field from './components/Field';
import blockShapes from './components/blockShapes';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [hasClickedRandom, setHasClickedRandom] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(null); // Track current block

  const handleGameReset = () => {
    setIsRunning(false);
    setGameOver(false);
    setResetGame(true); // Trigger reset
    setTimeout(() => setResetGame(false), 0); // Ensure `resetGame` is re-triggerable
    setHasClickedRandom(false);
    setCurrentBlock(null);
  };

  // Function to generate a random block
  const generateRandomBlock = () => {
    const blockTypes = Object.keys(blockShapes);
    const randomBlock = blockTypes[Math.floor(Math.random() * blockTypes.length)];
    setCurrentBlock(randomBlock);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center text-red-500 my-4">Kanoodle</h1>
      <div className="flex flex-col items-center">
        <Timer
          seconds={120}
          setIsRunning={setIsRunning}
          gameOver={gameOver}
          setGameOver={setGameOver}
          handleGameReset={handleGameReset}
          resetGame={resetGame}
          isRunning={isRunning}
          onRandomBlock={generateRandomBlock}
          hasClickedRandom={hasClickedRandom}
          setHasClickedRandom={setHasClickedRandom}
        />
        <Field
          isRunning={isRunning}
          resetGame={resetGame}
          setGameOver={setGameOver}
          currentBlock={currentBlock} // Pass current block to the field
        />
      </div>
    </div>
  );
}

export default App;
