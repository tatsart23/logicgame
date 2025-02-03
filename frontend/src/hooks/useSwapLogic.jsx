import { useState, useEffect } from "react";

const useSwapLogic = () => {
  const [tiles, setTiles] = useState(Array(16).fill(null));
  const [start, setStart] = useState(false);
  const [animate, setAnimate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameTime, setGameTime] = useState(0);

  const startGame = () => {
    const shuffledNumbers = [
      ...Array.from({ length: 15 }, (_, i) => i + 1),
      null,
    ].sort(() => Math.random() - 0.5);

    setTiles(shuffledNumbers);
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
    setTiles(Array(16).fill(null));
    setAnimate({});
  };

  const isSolved = tiles.every(
    (tile, index) => tile === index + 1 || tile === null
  );

  useEffect(() => {
    if (isSolved && start) {
      setIsModalOpen(true);
      handleStop();
    }
  }, [isSolved, start]);

  const handleTileClick = (index) => {
    if (!start) return;

    const emptyIndex = tiles.indexOf(null);
    const isAdjacent =
      (index === emptyIndex - 1 && emptyIndex % 4 !== 0) ||
      (index === emptyIndex + 1 && index % 4 !== 0) ||
      index === emptyIndex - 4 ||
      index === emptyIndex + 4;

    if (isAdjacent) {
      const newTiles = [...tiles];
      const rowDiff = Math.floor(emptyIndex / 4) - Math.floor(index / 4);
      const colDiff = (emptyIndex % 4) - (index % 4);

      setAnimate({
        [index]: {
          transform: `translate(${colDiff * 100}%, ${rowDiff * 100}%)`,
        },
      });

      setTimeout(() => {
        newTiles[emptyIndex] = tiles[index];
        newTiles[index] = null;
        setTiles(newTiles);
        setAnimate({});
      }, 300);
    }
  };

  /*const setWinState = () => {
    const winningState = [...Array.from({ length: 15 }, (_, i) => i + 1), null];
    setTiles(winningState);
  };*/

  return {
    tiles,
    start,
    animate,
    isModalOpen,
    gameTime,
    setGameTime,
    startGame,
    handleStop,
    handleTileClick,
    setIsModalOpen,
    /*setWinState*/
  };
};

export default useSwapLogic;
