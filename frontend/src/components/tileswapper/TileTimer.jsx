import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const TileTimer = ({ start, onTimeUpdate }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!start) {
      setTime(0);
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);

    return () => clearInterval(interval);
  }, [start]);

  // Notify the parent component when time changes
  useEffect(() => {
    onTimeUpdate(time);
  }, [time, onTimeUpdate]);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = (time % 1000).toString().padStart(3, '0');

  return (
    <div className="m-2 text-center bg-black text-red-700 p-2 rounded-md border-2 border-red-500 border-dotted">
      <p className="text-5xl mt-2">{minutes}:{seconds.toString().padStart(2, '0')}.{milliseconds}</p>
    </div>
  );
};

TileTimer.propTypes = {
  start: PropTypes.bool.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
};

export default TileTimer;
