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
  setRemainingTime,
}) => {
  const [timer, setTimer] = useState(seconds * 1000); // Muutettu millisekunteihin
  const timerId = useRef(null);

  // Aikaformaatin käsittely (mm:ss.mmm)
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(time % 1000).padStart(3, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  // Resetoi ajastimen, kun peli nollataan
  useEffect(() => {
    if (resetGame) {
      setTimer(seconds * 1000);
      setIsRunning(false);
      setGameOver(false);
    }
  }, [resetGame, seconds, setIsRunning, setGameOver]);

  // Ajastimen logiikka
  useEffect(() => {
    if (isRunning && !gameOver) {
      timerId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 10) {
            clearInterval(timerId.current);
            setGameOver(true);
            setIsRunning(false);
            return 0;
          }
          return prevTimer - 10;
        });
      }, 10);
    } else {
      clearInterval(timerId.current);
    }

    return () => clearInterval(timerId.current);
  }, [isRunning, gameOver, setGameOver, setIsRunning]);

  useEffect(() => {
    if (typeof setRemainingTime === "function") {
      setRemainingTime(timer);
    }
  }, [timer, setRemainingTime]);

  // Käsittele Random-toiminto
  const handleRandomClick = () => {
    if (hasClickedRandom) {
      alert("Random can only be used once!");
      return;
    }
    setHasClickedRandom(true);
    if (!isRunning) {
      setIsRunning(true);
      setGameOver(false);
    }
    onRandomBlock();
  };

  return (
    <div className="flex flex-col items-center">
      {gameOver ? (
        <h2 className="m-2 text-red-600 text-center">Game Over!</h2>
      ) : (
        <h2 className="m-2 text-center bg-black text-red-700 text-5xl p-2 rounded-md border-2 border-red-500 border-dotted">
          Timer: {formatTime(timer)}
        </h2>
      )}

      <div className="flex justify-center space-x-2 mt-4">
        <button
          className="px-4 py-2 rounded-md border border-black bg-lime-500 text-black text-xl hover:bg-lime-300 transition duration-200"
          onClick={() => setIsRunning(true)}
          disabled={isRunning || gameOver}
        >
          Start
        </button>
        <button
          className="px-4 py-2 rounded-md border border-black bg-red-500 text-black text-xl hover:bg-red-300 transition duration-200"
          onClick={handleGameReset}
        >
          Reset
        </button>
        <button
          className={`px-4 py-2 rounded-md border border-black text-black text-xl transition duration-200 ${
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
  setRemainingTime: PropTypes.func.isRequired,
};

export default Timer;
