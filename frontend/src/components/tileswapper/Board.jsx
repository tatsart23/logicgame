import { useState } from "react";
import Infopanel from "../Infopanel";
import TileData from "/src/data/TileData.jsx";

const Board = () => {
  const [tiles, setTiles] = useState(Array(16).fill(null));
  const [start, setStart] = useState(false);
  const [animate, setAnimate] = useState({});

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

  if (isSolved && start) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
        <p className="text-xl mt-4">You solved the puzzle!</p>
        <button
          onClick={startGame}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <>
      <Infopanel {...TileData} />

      <div className="m-5">
        <button
          onClick={startGame}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Start
        </button>

        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4"
        >
          Stop
        </button>
      </div>
      <div className="grid grid-cols-4 mt-4">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile border-2 border-black odd:bg-slate-400 even:bg-red-200  w-16 h-16 flex justify-center items-center`}
            onClick={() => handleTileClick(index)}
          >
            {tile && (
              <div
                className="number"
                style={{
                  transition: "transform 0.6s ease",
                  ...(animate[index] || {}),
                }}
              >
                {start && tile ? tile : ""}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
