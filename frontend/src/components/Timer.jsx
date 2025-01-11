import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";


const Timer = ({ seconds, setIsRunning, gameOver, setGameOver, resetGame, handleGameReset, isRunning }) => {
    const [timer, setTimer] = useState(seconds);
    const timerId = useRef();

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);

        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (resetGame) {
            setTimer(seconds);
            setGameOver(false);
            setIsRunning(false);
        }
    }
    , [resetGame, seconds, setGameOver, setIsRunning]);

    useEffect(() => {
        if (isRunning && !gameOver) {
          timerId.current = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer <= 1) {
                clearInterval(timerId.current);
                setGameOver(true);
                setIsRunning(false); // Update shared state
                return 0;
              }
              return prevTimer - 1;
            });
          }, 1000);
        } else {
          clearInterval(timerId.current);
        }
    
        return () => {
          clearInterval(timerId.current);
        };
      }, [isRunning, gameOver]);
    
      const handleStart = () => {
        if (!isRunning) {
          setIsRunning(true); // Update shared state
          setGameOver(false);
          setTimer(seconds);
        }
      };
    
      return (
        <div className="flex flex-col items-center">
          {gameOver ? (
            <h2 className="m-2 text-red-600 text-center">Game Over!</h2>
          ) : (
            <h2 className="m-2 text-center">Timer: {formatTime(timer)}</h2>
          )}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              className="rounded bg-lime-600 p-2"
              onClick={handleStart}
            >
              Start
            </button>
            <button
              className="rounded bg-red-600 p-2"
              onClick={handleGameReset}
            >
              Reset
            </button>
            <button className="rounded bg-amber-500 p-2">
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
      };
    
    export default Timer;