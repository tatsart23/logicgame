import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactConfetti from "react-confetti";

const Modal = ({ onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <ReactConfetti width={dimensions.width} height={dimensions.height} />
      <div className="modal-wrapper h-[300px] w-[400px]">
        <div className="modal-content flex items-center justify-center flex-col">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            🏆 Congratulations! 🏆
          </h1>
          <p className="mb-6">You won the game!</p>
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
};

export default Modal;
