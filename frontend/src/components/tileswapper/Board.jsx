import Infopanel from "../Infopanel";
import TileData from "/src/data/TileData.jsx";
import TileTimer from "./TileTimer";
import Modal from "../Modal";
import useSwapLogic from "../../hooks/useSwapLogic";

const Board = () => {
  const {
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
    /*setWinState,*/
  } = useSwapLogic(); 

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
          onClick={setWinState}
          className="px-4 py-2 rounded-md border border-black bg-blue-500 text-black text-xl hover:bg-blue-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 ml-4"
        >
          Set Win State
        </button>*/}
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} gameTime={gameTime} gameType="Tiles"/>}

      <div className="grid grid-cols-4 mt-4">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile border-2 border-black odd:bg-slate-400 even:bg-red-200  w-16 h-16 flex justify-center items-center hover:bg-gray-300 cursor-pointer`}
            onClick={() => handleTileClick(index)}
          >
            {tile && (
              <div
                className="bg-transparent w-14 h-14 flex justify-center items-center text-2xl font-bold hover:scale-[1.40] hover:border-2 border-red-500 transition duration-900"
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
