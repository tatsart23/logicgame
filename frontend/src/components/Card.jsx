import KanoodleCard from "../assets/img/Kanoodle-card.png";
import TileSwapCard from "../assets/img/Tile-card.png";
import MinigolfCard from "../assets/img/golf-card.png";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <Link to="/noodle">
          <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg bg-white group">
            <img
              src={KanoodleCard}
              alt="Kanoodle Card"
              className="w-full h-full object-cover transition-transform group-hover:scale-90 duration-500"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="p-4 text-white mb-4">
                <h1 className="font-bold text-xl">Kanoodle</h1>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/tileswap">
          <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg bg-white group">
            <img
              src={TileSwapCard}
              alt="Tileswap Card"
              className="w-full h-full object-cover transition-transform group-hover:scale-90 duration-500"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="p-4 text-white mb-4">
                <h1 className="font-bold text-xl">Tileswap</h1>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/minigolf">
          <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg bg-white group">
            <img
              src={MinigolfCard}
              alt="Tileswap Card"
              className="w-full h-full object-cover transition-transform group-hover:scale-90 duration-500"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="p-4 text-white mb-4">
                <h1 className="font-bold text-xl">Minigolf</h1>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
