import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({
  seconds = 120,
  setIsRunning,
  gameOver,
  setGameOver,
  resetGame,
  handleGameReset,
  isRunning,
  onRandomBlock,
  hasClickedRandom,
  setHasClickedRandom,
}) => {
  const [timer, setTimer] = useState(seconds); // Ajastimen tila
  const timerId = useRef(null); // Ajastimen id viittaukseen

  // Aikaformaatin käsittely
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Resetoi ajastimen, kun peli nollataan
  useEffect(() => {
    if (resetGame) {
      setTimer(seconds);
      setIsRunning(false);
      setGameOver(false);
    }
  }, [resetGame, seconds, setIsRunning, setGameOver]);

  // Ajastimen logiikka
  useEffect(() => {
    if (isRunning && !gameOver) {
      timerId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerId.current);
            setGameOver(true); // Aseta peli päättyneeksi
            setIsRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerId.current);
    }

    return () => clearInterval(timerId.current); // Puhdistus
  }, [isRunning, gameOver, setGameOver, setIsRunning]);

  // Käsittele Random-toiminto
  const handleRandomClick = () => {
    if (hasClickedRandom) {
      alert("Random can only be used once!");
      return;
    }
    setHasClickedRandom(true);
    if (!isRunning) {
      setIsRunning(true); // Käynnistä peli
      setGameOver(false);
    }
    onRandomBlock(); // Suorita random-toiminto
  };

  return (
    <div className="flex flex-col items-center">
      {/* Ajastimen näyttö */}
      {gameOver ? (
        <h2 className="m-2 text-red-600 text-center">Game Over!</h2>
      ) : (
        <h2 className="m-2 text-center">Timer: {formatTime(timer)}</h2>
      )}

      {/* Painikkeet */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          className="rounded bg-lime-600 text-white p-2 hover:bg-lime-700"
          onClick={() => setIsRunning(true)}
          disabled={isRunning || gameOver}
        >
          Start
        </button>
        <button
          className="rounded bg-red-600 text-white p-2 hover:bg-red-700"
          onClick={handleGameReset}
        >
          Reset
        </button>
        <button
          className={`rounded p-2 text-white ${
            hasClickedRandom
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
          onClick={handleRandomClick}
          disabled={hasClickedRandom}
        >
          Random
        </button>
      </div>
    </div>
  );
};

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  setIsRunning: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
  setGameOver: PropTypes.func.isRequired,
  resetGame: PropTypes.bool.isRequired,
  isRunning: PropTypes.bool.isRequired,
  handleGameReset: PropTypes.func.isRequired,
  onRandomBlock: PropTypes.func.isRequired,
  hasClickedRandom: PropTypes.bool.isRequired,
  setHasClickedRandom: PropTypes.func.isRequired,
};

export default Timer;
