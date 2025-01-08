import { useState } from "react";
import Blocks from "./Blocks";
import blockShapes from "./blockShapes";

const Field = () => {
  const [blocks, setBlocks] = useState([]); // Pysyvät palikat
  const [selectedBlock, setSelectedBlock] = useState(null); // Valittu palikka
  const [previewBlock, setPreviewBlock] = useState([]); // Esikatseltava palikka

  const handleBlockClick = (blockType) => {
    setSelectedBlock(blockType);
    setPreviewBlock([]); // Tyhjennä esikatselu
  };

  const handleGridHover = (index) => {
    if (!selectedBlock) return;
  
    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;
  
    const shape = blockShapes[selectedBlock];
    if (!shape) return;
  
    const previewPositions = shape.map(({ row, col }) => ({
      index: (targetRow + row) * 11 + (targetCol + col),
      row: targetRow + row,
      col: targetCol + col,
      type: selectedBlock,
    }));
  
    const isOutOfBounds = previewPositions.some(
      ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
    );
    if (isOutOfBounds) {
      setPreviewBlock([]); // Älä näytä mitään, jos alue on rajojen ulkopuolella
      return;
    }
  
    setPreviewBlock(previewPositions); // Aseta esikatselupalikka
  };
  const handleGridLeave = () => {
    setPreviewBlock([]); // Tyhjennä esikatselu, kun hiiri poistuu
  };

  const handleGridClick = (index) => {
    if (!selectedBlock) return;
  
    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;
  
    const shape = blockShapes[selectedBlock];
    if (!shape) return;
  
    const newPositions = shape.map(({ row, col }) => ({
      index: (targetRow + row) * 11 + (targetCol + col),
      row: targetRow + row,
      col: targetCol + col,
      type: selectedBlock,
    }));
  
    const isOutOfBounds = newPositions.some(
      ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
    );
    if (isOutOfBounds) {
      alert("Placement out of bounds!");
      return;
    }
  
    const isOverlapping = newPositions.some(({ index }) =>
      blocks.some((block) => block.position === index)
    );
    if (isOverlapping) {
      alert("Blocks are overlapping!");
      return;
    }
  
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      ...newPositions.map(({ index }) => ({ type: selectedBlock, position: index })),
    ]);
  
    setSelectedBlock(null);
    setPreviewBlock([]); // Tyhjennä esikatselu
  };

  const renderBlock = (blockType, isPreview = false) => {
    const previewClass = isPreview ? "opacity-50" : ""; // Esikatselun läpinäkyvyys
    switch (blockType) {
      case "red-block":
        return <div className={`red-block ${previewClass}`}></div>;
      case "yellow-block":
        return <div className={`yellow-block ${previewClass}`}></div>;
      case "green-block":
        return <div className={`green-block ${previewClass}`}></div>;
      case "gray-block":
        return <div className={`gray-block ${previewClass}`}></div>;
      case "cyan-block":
        return <div className={`cyan-block ${previewClass}`}></div>;
      case "magenta-block":
        return <div className={`magenta-block ${previewClass}`}></div>;
      case "purple-block":
        return <div className={`purple-block ${previewClass}`}></div>;
      case "pink-block":
        return <div className={`pink-block ${previewClass}`}></div>;
      case "orange-block":
        return <div className={`orange-block ${previewClass}`}></div>;
      case "lime-block":
        return <div className={`lime-block ${previewClass}`}></div>;
      case "white-block":
        return <div className={`white-block ${previewClass}`}></div>;
      case "light-blue-block":
        return <div className={`light-blue-block ${previewClass}`}></div>;
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
            onMouseEnter={() => handleGridHover(index)} // Hiiri ruudun päälle
            onMouseLeave={handleGridLeave} // Hiiri pois ruudusta
            onClick={() => handleGridClick(index)} // Klikkaa ruutua
          >
            {/* Renderöi pysyvät palikat */}
            {blocks
              .filter((block) => block.position === index)
              .map((block, i) => (
                <div key={i}>{renderBlock(block.type)}</div>
              ))}

            {/* Renderöi esikatselupalikat */}
            {previewBlock
              .filter((block) => block.index === index)
              .map((block, i) => (
                <div key={i}>{renderBlock(block.type, true)}</div>
              ))}
          </div>
        ))}
      </div>

      <Blocks handleBlockClick={handleBlockClick} />
    </>
  );
};

export default Field;
