import { useState, useEffect } from "react";
import Blocks from "./Blocks";
import blockShapes from "./blockShapes";

const Field = () => {
  const [blocks, setBlocks] = useState([]); // Pysyvät palikat
  const [selectedBlock, setSelectedBlock] = useState(null); // Valittu palikka
  const [previewBlock, setPreviewBlock] = useState([]); // Esikatseltava palikka
  const [rotation, setRotation] = useState(0); // Palikan kääntö
  const [usedBlocks, setUsedBlocks] = useState([]); // Lista käytetyistä palikoista

  const handleBlockClick = (blockType) => {
    if (usedBlocks.includes(blockType)) {
      alert("Tätä palikkaa on jo käytetty!"); // Jos palikka on jo käytetty
      return;
    }
    setSelectedBlock(blockType);
    setPreviewBlock([]); // Tyhjennä esikatselu
  };

  // Rotate block immediately when right-clicking (on context menu)
  const rotateBlock = () => {
    if (!selectedBlock) return;
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleGridHover = (index) => {
    if (!selectedBlock) return;

    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;

    const shapeData = blockShapes[selectedBlock];
    let shape = [];

    // Determine which rotation to use based on current rotation state
    const rotations = shapeData.rotations || [shapeData]; // Default to no rotation if none exist
    const rotationIndex = rotation / 90; // 0 for 0°, 1 for 90°, etc.

    // Get the correct shape based on current rotation
    shape = rotations[rotationIndex % rotations.length];

    const previewPositions = shape.map(({ row, col }) => ({
      index: (targetRow + row) * 11 + (targetCol + col),
      row: targetRow + row,
      col: targetCol + col,
      type: selectedBlock,
    }));

    // Check if the preview is out of bounds
    const isOutOfBounds = previewPositions.some(
      ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
    );
    if (isOutOfBounds) {
      setPreviewBlock([]); // Do not show preview if out of bounds
      return;
    }

    setPreviewBlock(previewPositions); // Update preview block positions
  };

  const handleGridLeave = () => {
    setPreviewBlock([]); // Tyhjennä esikatselu, kun hiiri poistuu
  };

  const checkIfWon = () => {
    const allDivs = document.querySelectorAll(".box");
    const filledDivs = document.querySelectorAll(".filled");
    if (allDivs.length === filledDivs.length && filledDivs.length > 0) {
      alert("You won!");
      gameOver = true;
    }
  };

  const handleGridClick = (index) => {
    if (!selectedBlock) return;

    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;

    const shapeData = blockShapes[selectedBlock];

    let shape = [];

    // Check if the block has rotations (for red-block)
    if (shapeData.rotations) {
      shape = shapeData.rotations[rotation / 90]; // Use the current rotation
    } else {
      shape = shapeData; // If no rotations, treat shapeData as the array directly
    }

    if (!Array.isArray(shape)) {
      console.error(`Shape for ${selectedBlock} is not an array`, shape);
      return;
    }

    const newPositions = shape.map(({ row, col }) => ({
      index: (targetRow + row) * 11 + (targetCol + col),
      row: targetRow + row,
      col: targetCol + col,
      type: selectedBlock,
    }));

    // Check if the new positions are out of bounds
    const isOutOfBounds = newPositions.some(
      ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
    );
    if (isOutOfBounds) {
      alert("Placement out of bounds!");
      return;
    }

    // Check if the block overlaps with existing blocks
    const isOverlapping = newPositions.some(({ index }) =>
      blocks.some((block) => block.position === index)
    );
    if (isOverlapping) {
      alert("Blocks are overlapping!");
      return;
    }

    // Add new positions to blocks array
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      ...newPositions.map(({ index }) => ({ type: selectedBlock, position: index })),
    ]);

    // Mark block as used
    setUsedBlocks((prevUsedBlocks) => [...prevUsedBlocks, selectedBlock]);

    // Reset selected block and preview
    setSelectedBlock(null);
    setPreviewBlock([]); // Clear preview block
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

  useEffect(() => {
    // Ensure preview is updated when rotation changes
    if (selectedBlock) {
      setPreviewBlock([]); // Reset preview block
    }
  }, [rotation, selectedBlock]);

  return (
    <>
      <div
        className="grid grid-cols-11 w-96 mt-5 border p-2"
        id="game-board"
      >
        {Array.from({ length: 55 }, (_, index) => (
          <div
            key={index}
            className={`box border transition-colors duration-200 ${
              blocks.some((block) => block.position === index) ? "filled" : ""
            }`}
            onMouseEnter={() => handleGridHover(index)} // Hiiri ruudun päälle
            onMouseLeave={handleGridLeave} // Hiiri pois ruudusta
            onClick={() => handleGridClick(index)} // Klikkaa ruutua
            onContextMenu={(e) => {
              e.preventDefault(); // Estetään kontekstivalikko
              rotateBlock(); // Pyöritä palikkaa
            }}
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
      {checkIfWon()}
      <Blocks handleBlockClick={handleBlockClick} />
    </>
  );
};

export default Field;
