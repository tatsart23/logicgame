import useGolfLogic from "../../hooks/useGolfLogic";
import GolfData from "../../data/GolfData";
import Infopanel from "../Infopanel";

const Golf = () => {
  const {
    ball,
    handleMouseDown,
    svgRef,
    isDragging,
    dragStart,
    dragEnd,
    obstacles,
    hole,
  } = useGolfLogic();

  const getLineEndPoint = () => {
    if (!dragStart || !dragEnd) return { x: ball.x, y: ball.y };
    const dx = dragStart.x - dragEnd.x;
    const dy = dragStart.y - dragEnd.y;
    return { x: ball.x + dx * 0.2, y: ball.y + dy * 0.2 };
  };

  return (
    <div>
      <h1>MiniGolf Peli</h1>
      <Infopanel {...GolfData} />
      <svg
        ref={svgRef}
        width="500"
        height="300"
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
      >
        <rect x="0" y="0" width="500" height="300" fill="green" />

        {obstacles.map((obs, index) => (
          <rect key={index} x={obs.x} y={obs.y} width={obs.width} height={obs.height} fill="brown" />
        ))}

        <circle cx={ball.x} cy={ball.y} r="10" fill="white" />
        <circle cx={hole.x} cy={hole.y} r={hole.radius} fill="black" />

        {isDragging && dragStart && dragEnd && (
          <line
            x1={ball.x}
            y1={ball.y}
            x2={getLineEndPoint().x}
            y2={getLineEndPoint().y}
            stroke="red"
            strokeWidth="2"
          />
        )}
      </svg>
    </div>
  );
};

export default Golf;
