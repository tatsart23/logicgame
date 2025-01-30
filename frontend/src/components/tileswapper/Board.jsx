import { useState, useEffect } from "react";
import Infopanel from "../Infopanel";
import TileData from "/src/data/TileData.jsx";
import TileTimer from "./TileTimer";
import Modal from "../Modal";

const Board = () => {
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

  /*const setWinState = () => {
    const winningState = [...Array.from({ length: 15 }, (_, i) => i + 1), null];
    setTiles(winningState);
  };*/

  const isSolved = tiles.every(
    (tile, index) => tile === index + 1 || tile === null
  );

  // Odotetaan että peli on ratkaistu ja aika on päivittynyt ennen kuin modaalin näyttäminen käynnistyy
  useEffect(() => {
    if (isSolved && start) {
      setIsModalOpen(true); // Vasta avataan modaalin
      handleStop(); // Lopetetaan peli
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

  return (
    <>
      <Infopanel {...TileData} />
      <TileTimer start={start} setGameTime={setGameTime} />
      <div className="m-5">
        <button
          onClick={startGame}
          className="px-4 py-2 rounded-md border mr-4 border-black bg-lime-500 text-black text-xl hover:bg-lime-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
        >
          Start
        </button>

        <button
          onClick={handleStop}
          className="px-4 py-2 rounded-md border border-black bg-red-500 text-black text-xl hover:bg-red-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
        >
          Stop
        </button>

        {/*<button
          onClick={setWinState} // Tämä painike ei enää laukaise modalin näyttämistä heti
          className="px-4 py-2 rounded-md border border-black bg-blue-500 text-black text-xl hover:bg-blue-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 ml-4"
        >
          Set Win State
        </button>*/}
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} gameTime={gameTime} />}
      <div className="grid grid-cols-4 mt-4">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile border-2 border-black odd:bg-slate-400 even:bg-red-200  w-16 h-16 flex justify-center items-center hover:bg-gray-300 cursor-pointer `}
            onClick={() => handleTileClick(index)}
          >
            {tile && (
              <div
                className="text-2xl font-bold hover:text-4xl transition duration-900"
                style={{
                  transition: "transform 0.4s ease-in-out",
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
