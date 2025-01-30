import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactConfetti from "react-confetti";

const Modal = ({ onClose, gameTime }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 ">
      <ReactConfetti width={dimensions.width} height={dimensions.height} />
      <div className="modal-wrapper h-[300px] w-[400px] motion-scale-in-[0.5] motion-translate-x-in-[-120%] motion-translate-y-in-[-60%] motion-opacity-in-[33%] motion-rotate-in-[-1080deg] motion-blur-in-[10px] motion-delay-[0.38s]/scale motion-duration-[0.38s]/opacity motion-duration-[1.20s]/rotate motion-duration-[0.15s]/blur motion-delay-[0.60s]/blur motion-ease-spring-bouncier">
        <div className="modal-content flex items-center justify-center flex-col">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            🏆 Congratulations! 🏆
          </h1>
          <p className="mb-6">You won the game!</p>
          <p className="mb-6">
            Your time: {minutes}:{seconds.toString().padStart(2, "0")}.
            {milliseconds}
          </p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
  gameTime: PropTypes.number.isRequired,  // Muista lisätä propTypes
};

export default Modal;
