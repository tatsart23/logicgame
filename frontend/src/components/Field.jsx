import { useState } from "react";

const Field = () => {
  const [blocks, setBlocks] = useState([]);

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

    if (blockType) {
      setBlocks((prevBlocks) => [
        ...prevBlocks,
        { type: blockType, position: targetIndex },
      ]);
    }
  };

  const renderBlock = (blockType) => {
    switch (blockType) {
      case "red-block":
        return (
          <div className="grid grid-cols-2 grid-rows-3 " style={{ height: "108px", width: "66px" }}>
            <div className="red-block"></div>
            <div className="red-block"></div>
            <div className="red-block"></div>
            <div className="red-block"></div>
            <div className="red-block"></div>
          </div>
        );
      case "yellow-block":
        return (
          <div className="grid grid-cols-2 grid-rows-3" style={{ height: "108px", width: "66px" }}>
            <div className="yellow-block"></div>
            <div className="yellow-block"></div>
            <div className="yellow-block col-span-2"></div>
            <div className="yellow-block"></div>
            <div className="yellow-block"></div>
          </div>
        );
      case "green-block":
        return (
          <div className="grid grid-cols-2 grid-rows-4" style={{ height: "144px", width: "66px" }}>
            <div className="green-block col-span-2"></div>
            <div className="green-block"></div>
            <div className="green-block"></div>
            <div className="green-block col-start-2"></div>
            <div className="green-block col-start-2"></div>
          </div>
        );
      case "gray-block":
        return (
          <div className="grid grid-cols-3 grid-rows-3 w-16" style={{ height: "108px", width: "100px" }}>
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
        );
      case "cyan-block":
        return (
          <div className="grid grid-cols-4 grid-rows-2 w-16" style={{ height: "72px", width: "133px" }}>
            <div className="cyan-block col-start-1 col-span-1"></div>
            <div className="cyan-block col-start-1 row-start-2"></div>
            <div className="cyan-block col-start-2 row-start-2"></div>
            <div className="cyan-block col-start-3 row-start-2"></div>
            <div className="cyan-block col-start-4 row-start-2"></div>
          </div>
        );
      case "magenta-block":
        return (
          <div className="grid grid-cols-3 grid-rows-3 w-16" style={{ height: "108px", width: "100px" }}>
            <div></div>
            <div className="magenta-block"></div>
            <div className="magenta-block"></div>
            <div className="magenta-block"></div>
            <div className="magenta-block"></div>
            <div></div>
            <div className="magenta-block"></div>
          </div>
        );
      case "purple-block":
        return (
          <div className="grid w-8" style={{ height: "144px" }}>
            <div className="purple-block"></div>
            <div className="purple-block"></div>
            <div className="purple-block"></div>
            <div className="purple-block"></div>
          </div>
        );
      case "pink-block":
        return (
          <div className="grid grid-cols-4 grid-rows-2" style={{ height: "71px",width: "133px" }}>
            <div className="pink-block col-start-1 col-span-1"></div>
            <div className="pink-block col-start-2 row-start-2"></div>
            <div className="pink-block"></div>
            <div className="pink-block"></div>
            <div className="pink-block"></div>
          </div>
        );
      case "orange-block":
        return (
          <div className="grid grid-cols-3 grid-rows-2 w-16" style={{ height: "71px", width: "100px" }}>
            <div className="orange-block"></div>
            <div className="orange-block"></div>
            <div className="orange-block"></div>
            <div className="orange-block"></div>
          </div>
        );
      case "lime-block":
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-16" style={{ height: "71px", width: "66px" }}>
            <div className="lime-block"></div>
            <div className="lime-block"></div>
            <div className="lime-block"></div>
            <div className="lime-block"></div>
          </div>
        );
      case "white-block":
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-16" style={{ height: "71px" }}>
            <div className="white-block"></div>
            <div className="white-block"></div>
            <div className="white-block"></div>
          </div>
        );
      case "light-blue-block":
        return (
          <div className="grid grid-rows-3 grid-cols-3 w-16" style={{ height: "109px", width: "100px" }}>
            <div className="light-blue-block"></div>
            <div className="light-blue-block"></div>
            <div className="light-blue-block"></div>
            <div className="light-blue-block"></div>
            <div className="light-blue-block col-start-1"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="grid grid-cols-11 w-96 mt-5 border p-2"
        id="game-board"
      >
        {Array.from({ length: 55 }, (_, index) => (
          <div
            key={index}
            className="box border transition-colors duration-200"
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
