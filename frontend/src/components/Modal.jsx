import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactConfetti from "react-confetti";
import axios from "axios";

const Modal = ({ onClose, gameTime, gameType }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [name, setName] = useState("");  // Nimen tallennus
  const [score, setScore] = useState(Math.floor(gameTime / 1000));  // Oletetaan, että score lasketaan gameTimesta
  const [game, setGame] = useState(gameType); // Pelin nimi

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/leaderboard?game=${game}`);
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, [game]); // Re-fetch if the game type changes


  // Lähettää nimen ja score tietokantaan
  const postLeaderboard = async (game, name, score) => {
    try {
      const response = await axios.post("http://localhost:5000/leaderboard", { game, name, score });
      setLeaderboard((prevLeaderboard) => [response.data, ...prevLeaderboard]);
    } catch (error) {
      console.error("Virhe leaderboardin lähettämisessä:", error);
      alert("Leaderboard submission failed. Please try again.");
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      postLeaderboard(game, name, score);
      setName(""); // Tyhjennetään nimi kenttä lähetyksen jälkeen
    } else {
      alert("Please enter your name.");
    }
  };

  const handleSize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const minutes = Math.floor(gameTime / 60000);
  const seconds = Math.floor((gameTime % 60000) / 1000);
  const milliseconds = (gameTime % 1000).toString().padStart(3, "0");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <ReactConfetti width={dimensions.width} height={dimensions.height} />
      <div
        className="modal-wrapper w-[400px] p-4 bg-white rounded-lg shadow-lg"
        style={{
          height: `${dimensions.height * 0.6}px`,
          width: `${dimensions.width * 0.5}px`,
        }}
      >
        <div className="modal-content flex items-center justify-center flex-col">
          <h1 className="text-3xl font-bold mb-2 flex items-center m-2">
            🏆 Congratulations! 🏆
          </h1>
          <p className="mb-2">You won the game!</p>
          <p className="mb-2">
            Your time: {minutes}:{seconds.toString().padStart(2, "0")}:
            {milliseconds}
          </p>

          <h2 className="text-xl font-semibold mt-2 caption-top">Leaderboard</h2>

          {/* Nimi syöttökenttä ja lähetyspainike */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center mt-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="px-4 py-2 mb-4 w-32 border rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit Score
            </button>
          </form>

          {/* Leaderboard taulukko */}
          <ul className="m-2 max-h-96 w-96 overflow-y-auto">
            {leaderboard.length > 0 ? (
              <table className="min-w-full table-auto border border-gray-300 [&>*:nth-child(odd)]:bg-red-500">
                <thead>
                  <tr>
                    <th className="px-4 text-left">#</th>
                    <th className="px-4 text-left">Name</th>
                    <th className="px-4 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.slice(0, 10).map((entry, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } font-semibold`}
                    >
                      <td className="px-4">{index + 1}</td>
                      <td className="px-4">{entry.name}</td>
                      <td className="px-4">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </ul>

          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white w-32 absolute bottom-2 font-bold py-2 px-4 rounded mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  gameTime: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
};

export default Modal;
