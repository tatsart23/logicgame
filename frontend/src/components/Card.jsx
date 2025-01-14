import KanoodleCard from "../assets/img/Kanoodle-card.png";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <Link to="/noodle">
      <div className="relative max-w-xs overflow-hidden rounded-lg shadow-lg bg-white group">
        <img
          src={KanoodleCard}
          alt="Kanoodle Card"
          className="transition-transform group-hover:scale-90 duration-500"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
          <div className="p-4 text-white mb-4">
            <h1 className="font-bold text-xl">Kanoodle</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
