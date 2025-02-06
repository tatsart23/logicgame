import { useState, useEffect, useCallback, useRef } from 'react';
import Infopanel from "../Infopanel";
import FlappyData from '../../data/FlappyData';
import backgroundImage from '../../assets/img/background.jpg';

const Flappy = () => {
  const [birdY, setBirdY] = useState(250);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [birdRotation, setBirdRotation] = useState(0); // Rotation for bird
  const [bgPositionX, setBgPositionX] = useState(0); // Parallax position
  const gameLoopRef = useRef(null);
  const pipeTimerRef = useRef(null);

  // Gravity effect
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      gameLoopRef.current = setInterval(() => {
        setBirdY(y => y + 4);
        setBirdRotation(rotation => Math.min(rotation + 10, 90)); // Bird falls down
      }, 50);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [isPlaying, isGameOver]);

  // Generate pipes
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      pipeTimerRef.current = setInterval(() => {
        const gap = 150;
        const topHeight = Math.random() * (300 - gap);
        setPipes(prev => [...prev, { x: 400, topHeight, passed: false }]);
      }, 2000);
    }
    return () => clearInterval(pipeTimerRef.current);
  }, [isPlaying, isGameOver]);

  // Move pipes and remove off-screen ones
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      const movePipes = setInterval(() => {
        setPipes(prev =>
          prev
            .map(pipe => ({ ...pipe, x: pipe.x - 5 }))
            .filter(pipe => pipe.x > -50)
        );
      }, 50);
      return () => clearInterval(movePipes);
    }
  }, [isPlaying, isGameOver]);

  // Handle spacebar press
  const jump = useCallback(() => {
    if (!isPlaying) setIsPlaying(true);
    setBirdY(y => y - 60);
    setBirdRotation(-30); // Bird jumps upwards
  }, [isPlaying]);

  // Handle keydown for spacebar
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  // Collision detection and game over logic
  useEffect(() => {
    if (birdY <= 0 || birdY >= 570) {
      setIsGameOver(true);
      setIsPlaying(false);
    }

    const birdRect = { x: 60, y: birdY, width: 40, height: 30 };
    
    pipes.forEach(pipe => {
      const pipeRectTop = { x: pipe.x, y: 0, width: 50, height: pipe.topHeight };
      const pipeRectBottom = { x: pipe.x, y: pipe.topHeight + 150, width: 50, height: 600 };

      if (checkCollision(birdRect, pipeRectTop) || checkCollision(birdRect, pipeRectBottom)) {
        setIsGameOver(true);
        setIsPlaying(false);
      }

      // Score update when bird passes a pipe
      if (!pipe.passed && pipe.x < 60) {
        setScore(s => s + 1);
        pipe.passed = true;
      }
    });
  }, [birdY, pipes]);

  // Reset game
  const reset = () => {
    setBirdY(250);
    setPipes([]);
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(false);
  };

  // Parallax Effect
  useEffect(() => {
    if (isPlaying) {
      const moveBackground = setInterval(() => {
        setBgPositionX((prevPos) => {
          const newPos = prevPos - 1;
          return newPos <= -400 ? 0 : newPos;
        });
      }, 50);
      return () => clearInterval(moveBackground);
    }
  }, [isPlaying]);


  return (
    <div className="relative w-[400px] h-[600px] overflow-hidden mt-20">
        
        <div
            className="absolute w-full h-full bg-repeat-x"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPositionX: `${bgPositionX}px`,
                backgroundSize: 'cover',
              }}
    />

      {/* Start Screen */}
      {!isPlaying && !isGameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
          <p>Press Space to Start</p>
        </div>
        
      )}

      <Infopanel {...FlappyData} />

      {/* Bird */}
      <div
        className="absolute w-10 h-8 bg-yellow-400 rounded-full"
        style={{
          top: `${birdY}px`,
          left: '60px',
          transform: `rotate(${birdRotation}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Pipes */}
      {pipes.map((pipe, i) => (
        <div key={i}>
          <div
            className="absolute bg-green-500 w-12 border border-darkgreen"
            style={{ left: `${pipe.x}px`, height: `${pipe.topHeight}px`, top: 0 }}
          />
          <div
            className="absolute bg-green-500 w-12 border border-darkgreen"
            style={{
              left: `${pipe.x}px`,
              height: `600px`,
              top: `${pipe.topHeight + 150}px`,
            }}
          />
        </div>
      ))}

      {/* Score */}
      <div className="absolute top-4 left-4 text-2xl font-bold">{score}</div>

      {/* Reset Button */}
      {isGameOver && (
        <button onClick={reset} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded">
          Restart
        </button>
      )}
    </div>
  );
};

const checkCollision = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

export default Flappy;
