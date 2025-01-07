import { useState } from "react";

const Field = () => {
  const [blocks, setBlocks] = useState([]);

  // Block shape definitions (relative positions for each block type)
  const blockShapes = {
    "red-block": [
      { row: 0, col: 0 }, { row: 0, col: 1 },
      { row: 1, col: 0 }, { row: 1, col: 1 },
      { row: 2, col: 0 }
    ],
    "yellow-block": [
      { row: 0, col: 0 }, { row: 0, col: 1 },
      { row: 1, col: 0 }, { row: 2, col: 0 },
      { row: 2, col: 1 }
    ],
    "green-block": [
      { row: 0, col: 0 }, { row: 2, col: 1 },
      { row: 1, col: 0 }, { row: 3, col: 1 },
      { row: 1, col: 1 }
    ],
    "gray-block": [
      { row: 0, col: 1 }, { row: 1, col: 0 },
      { row: 1, col: 1 }, { row: 1, col: 2 },
      { row: 2, col: 1 }
    ],
    "cyan-block": [
      { row: 0, col: 0 }, { row: 1, col: 0 },
      { row: 1, col: 1 }, { row: 1, col: 2 },
      { row: 1, col: 3 }
    ],
    "magenta-block": [
      { row: 0, col: 1 }, { row: 0, col: 2 },
      { row: 1, col: 0 }, { row: 1, col: 1 },
      { row: 2, col: 0 }
    ],
    "purple-block": [
      { row: 0, col: 0 }, { row: 1, col: 0 },
      { row: 2, col: 0 }, { row: 3, col: 0 }
    ],
    "pink-block": [
      { row: 0, col: 0 }, { row: 0, col: 2 },
      { row: 0, col: 1 }, { row: 1, col: 1 },
      { row: 0, col: 3 }
    ],
    "orange-block": [
      { row: 0, col: 0 }, { row: 0, col: 1 },
      { row: 1, col: 0 }, { row: 0, col: 2 }
    ],
    "lime-block": [
      { row: 0, col: 0 }, { row: 0, col: 1 },
      { row: 1, col: 0 }, { row: 1, col: 1 }
    ],
    "white-block": [
      { row: 0, col: 0 }, { row: 0, col: 1 },
      { row: 1, col: 0 }
    ],
    "light-blue-block": [
      { row: 0, col: 0 }, { row: 0, col: 1 },
      { row: 0, col: 2 }, { row: 1, col: 0 },
      { row: 2, col: 0 }
    ]
  };
    // Add additional block types here

  const handleDragStart = (event, blockType) => {
    event.dataTransfer.setData("blockType", blockType);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
  
    const blockType = event.dataTransfer.getData("blockType");
    if (!blockType) return;
  
    const targetRow = Math.floor(targetIndex / 11); // 11 columns in the grid
    const targetCol = targetIndex % 11;
  
    const shape = blockShapes[blockType];
    if (!shape) return;
  
    // Calculate new positions based on the block's shape and drop location
    const newPositions = shape.map(({ row, col }) => ({
      index: (targetRow + row) * 11 + (targetCol + col), // Calculate absolute index
      row: targetRow + row,
      col: targetCol + col,
      type: blockType,
    }));
  
    // Validation: Check for out-of-bounds
    const isOutOfBounds = newPositions.some(
      ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5 // 5 rows, 11 columns
    );
    if (isOutOfBounds) {
      alert("Placement out of bounds!");
      return;
    }
  
    // Validation: Check for overlapping blocks
    const isOverlapping = newPositions.some(({ index }) =>
      blocks.some((block) => block.position === index)
    );
    if (isOverlapping) {
      alert("Blocks are overlapping!");
      return;
    }
  
    // If valid, update the state with the new block positions
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      ...newPositions.map(({ index }) => ({ type: blockType, position: index })),
    ]);
  };
  
  

  const renderBlock = (blockType) => {
    switch (blockType) {
      case "red-block":
        return <div className="red-block"></div>;
      case "yellow-block":
        return <div className="yellow-block"></div>;
      case "green-block":
        return <div className="green-block"></div>;
      case "gray-block":
        return <div className="gray-block"></div>;
      case "cyan-block":
        return <div className="cyan-block"></div>;
      case "magenta-block":
        return <div className="magenta-block"></div>;
      case "purple-block":
        return <div className="purple-block"></div>;
      case "pink-block":
        return <div className="pink-block"></div>;
      case "orange-block":
        return <div className="orange-block"></div>;
      case "lime-block":
        return <div className="lime-block"></div>;
      case "white-block":
        return <div className="white-block"></div>;
      case "light-blue-block":
        return <div className="light-blue-block"></div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-11 w-96 mt-5 border p-2" id="game-board">
        {Array.from({ length: 55 }, (_, index) => (
          <div
            key={index}
            className={`box border transition-colors duration-200 ${
              blocks.some((block) => block.position === index) ? "filled" : ""
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {blocks
              .filter((block) => block.position === index)
              .map((block, i) => (
                <div key={i}>{renderBlock(block.type)}</div>
              ))}
          </div>
        ))}
      </div>

      <div className="mt-2 p-3 grid grid-cols-3 bg-blue-500 gap-4">
        <div
          className="grid grid-cols-2 grid-rows-3 w-16"
          style={{ height: "95px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "red-block")}
        >
          <div className="red-block"></div>
          <div className="red-block "></div>
          <div className="red-block"></div>
          <div className="red-block"></div>
          <div className="red-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-3 w-16 "
          style={{ height: "95px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "yellow-block")}
        >
          <div className="yellow-block"></div>
          <div className="yellow-block"></div>
          <div className="yellow-block col-span-2"></div>
          <div className="yellow-block"></div>
          <div className="yellow-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-4 w-16"
          style={{ height: "124px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "green-block")}
        >
          <div className="green-block col-span-2"></div>
          <div className="green-block"></div>
          <div className="green-block"></div>
          <div className="green-block col-start-2"></div>
          <div className="green-block col-start-2"></div>
        </div>
        <div
          className="grid grid-cols-3 grid-rows-3 place-items-center"
          style={{ width: "95px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "gray-block")}
        >
          <div></div>
          <div className="gray-block"></div>
          <div></div>
          <div className="gray-block"></div>
          <div className="gray-block"></div>
          <div className="gray-block"></div>
          <div></div>
          <div className="gray-block"></div>
          <div></div>
        </div>
        <div
          className="grid grid-cols-4 grid-rows-2"
          style={{ height: "62px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "cyan-block")}
        >
          <div className="cyan-block col-start-1 col-span-1"></div>
          <div className="cyan-block col-start-1 row-start-2"></div>
          <div className="cyan-block col-start-2 row-start-2"></div>
          <div className="cyan-block col-start-3 row-start-2"></div>
          <div className="cyan-block col-start-4 row-start-2"></div>
        </div>
        <div className="grid grid-cols-3 grid-rows-3" style={{ width: "95px" }}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, "magenta-block")}>
          <div></div>
          <div className="magenta-block"></div>
          <div className="magenta-block"></div>
          <div className="magenta-block"></div>
          <div className="magenta-block"></div>
          <div></div>
          <div className="magenta-block"></div>
        </div>
        <div className="grid w-8" style={{ height: "120px" }}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, "purple-block")}>
          <div className="purple-block"></div>
          <div className="purple-block"></div>
          <div className="purple-block"></div>
          <div className="purple-block"></div>
        </div>
        <div
          className="grid grid-cols-4 grid-rows-2"
          style={{ height: "62px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "pink-block")}
        >
          <div className="pink-block col-start-1 col-span-1"></div>
          <div className="pink-block col-start-2 row-start-2"></div>
          <div className="pink-block"></div>
          <div className="pink-block"></div>
          <div className="pink-block"></div>
        </div>
        <div
          className="grid grid-cols-3 grid-rows-2"
          style={{ height: "62px", width: "95px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "orange-block")}
        >
          <div className="orange-block"></div>
          <div className="orange-block"></div>
          <div className="orange-block"></div>
          <div className="orange-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-2 w-16"
          style={{ height: "62px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "lime-block")}
        >
          <div className="lime-block"></div>
          <div className="lime-block"></div>
          <div className="lime-block"></div>
          <div className="lime-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-2 w-16"
          style={{ height: "62px" }}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "white-block")}
        >
          <div className="white-block"></div>
          <div className="white-block"></div>
          <div className="white-block"></div>
        </div>
        <div className="grid grid-rows-3 grid-cols-3" style={{ width: "95px" }}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, "light-blue-block")}>
          <div className="light-blue-block"></div>
          <div className="light-blue-block"></div>
          <div className="light-blue-block"></div>
          <div className="light-blue-block"></div>
          <div className="light-blue-block col-start-1"></div>
        </div>
      </div>
    </>
  );
};

export default Field;