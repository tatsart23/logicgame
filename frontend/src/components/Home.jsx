import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-600">TERETULEMAST EESTIMANTEREEL</h1>
      <div className="mt-5">
        <Link to="/noodle">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Mene Pelaamaan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
