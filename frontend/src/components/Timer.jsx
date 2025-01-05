import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ seconds }) => {
    const [timer, setTimer] = useState(seconds);
    const [gameOver, setGameOver] = useState(false); // Seurataan, onko peli päättynyt
    const [isRunning, setIsRunning] = useState(false); // Käytetään ajastimen käynnistämiseen ja pysäyttämiseen
    const timerId = useRef();

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);

        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (isRunning && !gameOver) {
            timerId.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(timerId.current);
                        setGameOver(true); // Peli päättyy
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

    // Käynnistää ajastimen
    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            setGameOver(false); // Varmistetaan, että peli ei ole päättynyt
            setTimer(seconds); // Asetetaan ajastin alussa määritettyyn sekuntimäärään
        }
    };

    // Resetoi ajastin
    const handleReset = () => {
        setIsRunning(false);
        setGameOver(false);
        setTimer(seconds); // Palautetaan alkuperäinen aika
    };

    return (
        <div>
            {gameOver ? (
                <h2 className="m-2 text-red-600">Game Over!</h2> // Ilmoitus pelin päättymisestä
            ) : (
                <h2 className="m-2">Timer: {formatTime(timer)}</h2>
            )}
            <button
                className="m-1 rounded bg-lime-600 p-2"
                onClick={handleStart}
            >
                Start
            </button>
            <button
                className="m-1 rounded bg-red-600 p-2"
                onClick={handleReset}
            >
                Reset
            </button>
        </div>
    );
};

Timer.propTypes = {
    seconds: PropTypes.number.isRequired,
};

export default Timer;
