import { useState, useEffect } from "react";
import Blocks from "./Blocks";
import blockShapes from "./blockShapes";
import Infopanel from "./Infopanel";
import Timer from "./Timer";


const Field = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [hasClickedRandom, setHasClickedRandom] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [previewBlock, setPreviewBlock] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [usedBlocks, setUsedBlocks] = useState([]);
  const [isInverted, setIsInverted] = useState(false); // Tracks whether the block is inverted




  // Utility: Palikan visualisointi
  const renderBlock = (blockType, isPreview = false) => {
    const previewClass = isPreview ? "opacity-50" : "";
    const blockClasses = {
      "red-block": "red-block",
      "yellow-block": "yellow-block",
      "green-block": "green-block",
      "gray-block": "gray-block",
      "cyan-block": "cyan-block",
      "magenta-block": "magenta-block",
      "purple-block": "purple-block",
      "pink-block": "pink-block",
      "orange-block": "orange-block",
      "lime-block": "lime-block",
      "white-block": "white-block",
      "light-blue-block": "light-blue-block",
    };
    return blockType in blockClasses ? (
      <div className={`${blockClasses[blockType]} ${previewClass}`}></div>
    ) : null;
  };

  // Peli logiikka
  const handleGameReset = () => {
    setIsRunning(false);
    setGameOver(false);
    setResetGame(true);
    setTimeout(() => setResetGame(false), 0);
    setCurrentBlock(null);
    setHasClickedRandom(false);
    handleReset();
  };

  const generateRandomBlock = () => {
    const blockTypes = Object.keys(blockShapes);
    const randomBlock =
      blockTypes[Math.floor(Math.random() * blockTypes.length)];
    setCurrentBlock(randomBlock);
  };

  const placeRandomBlock = (blockType) => {
    if (usedBlocks.includes(blockType)) return;

    const shapeData = blockShapes[blockType];
    if (!shapeData) return;

    const rotations = shapeData.rotations || [shapeData];
    let placed = false;

    while (!placed) {
      const randomPosition = Math.floor(Math.random() * 55);
      const targetRow = Math.floor(randomPosition / 11);
      const targetCol = randomPosition % 11;

      const rotationIndex = Math.floor(Math.random() * rotations.length);
      const shape = rotations[rotationIndex];

      const previewPositions = shape
      .map(({ row, col }) =>
        isInverted
          ? { row: -row, col } // Apply inversion if necessary
          : { row, col }
      )
      .map(({ row, col }) => ({
        index: (targetRow + row) * 11 + (targetCol + col),
        row: targetRow + row,
        col: targetCol + col,
        type: selectedBlock,
  }));


      const isOutOfBounds = previewPositions.some(
        ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
      );

      if (!isOutOfBounds) {
        setBlocks((prev) => [
          ...prev,
          ...previewPositions.map(({ index }) => ({
            type: blockType,
            position: index,
          })),
        ]);
        setUsedBlocks((prev) => [...prev, blockType]);
        placed = true;
      }
    }
  };

  useEffect(() => {
    if (currentBlock) placeRandomBlock(currentBlock);
  }, [currentBlock]);

  const handleGridHover = (index) => {
    if (!selectedBlock) return;
  
    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;
  
    const shapeData = blockShapes[selectedBlock];
    const rotations = shapeData.rotations || [shapeData];
    const shape = rotations[(rotation / 90) % rotations.length];
  
    const previewPositions = shape
      .map(({ row, col }) =>
        isInverted
          ? { row: -row, col } // Apply inversion if necessary
          : { row, col }
      )
      .map(({ row, col }) => ({
        index: (targetRow + row) * 11 + (targetCol + col),
        row: targetRow + row,
        col: targetCol + col,
        type: selectedBlock,
      }));
  
    const isOutOfBounds = previewPositions.some(
      ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
    );
  
    setPreviewBlock(isOutOfBounds ? [] : previewPositions);
  };
  

  const handleGridLeave = () => setPreviewBlock([]);

  const handleGridClick = (index) => {
    if (!isRunning) {
      alert("The game is not running! Press Start to begin.");
      return;
    }
    if (!selectedBlock) return;

     // Prevent duplicate block use
    if (usedBlocks.includes(selectedBlock)) {
      alert("This block has already been used!");
      return;
    }
  
    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;
  
    const shapeData = blockShapes[selectedBlock];
    const shape = shapeData.rotations
      ? shapeData.rotations[(rotation / 90) % shapeData.rotations.length]
      : shapeData;
  
    // Apply inversion if necessary
    const finalShape = isInverted
      ? shape.map(({ row, col }) => ({ row: -row, col }))
      : shape;
  
    const newPositions = finalShape.map(({ row, col }) => ({
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
  
    setBlocks((prev) => [
      ...prev,
      ...newPositions.map(({ index }) => ({ type: selectedBlock, position: index })),
    ]);
    setUsedBlocks((prev) => [...prev, selectedBlock]);
    setSelectedBlock(null);
    setPreviewBlock([]); // Clear preview
    setRotation(0); // Reset rotation
    setIsInverted(false); // Reset inversion
  };
  


  const inverseBlock = () => {
    if (!selectedBlock) return;
  
    setIsInverted((prev) => !prev); // Toggle the inversion state
  
    const shapeData = blockShapes[selectedBlock];
    const rotations = shapeData.rotations || [shapeData];
    const currentShape = rotations[(rotation / 90) % rotations.length];
  
    // Flip the block vertically (or horizontally if needed)
    const flippedShape = currentShape.map(({ row, col }) => ({
      row: -row, // Flip vertically
      col,
    }));
  
    // Update the preview block with the inverted shape
    setPreviewBlock((prevPreview) => {
      if (!prevPreview || prevPreview.length === 0) return [];
  
      const targetRow = prevPreview[0].row; // Reference row from current preview
      const targetCol = prevPreview[0].col; // Reference column from current preview
  
      return flippedShape.map(({ row, col }) => ({
        index: (targetRow + row) * 11 + (targetCol + col),
        row: targetRow + row,
        col: targetCol + col,
        type: selectedBlock,
      }));
    });
  };
  


  const rotateBlock = () => {
    if (!selectedBlock) return;
  
    const shapeData = blockShapes[selectedBlock];
    const rotations = shapeData.rotations || [shapeData];
  
    // Apply inversion after rotation
    const newRotation = (rotation + 90) % 360;
    const rotatedShape = rotations[(newRotation / 90) % rotations.length];
    const finalShape = isInverted
      ? rotatedShape.map(({ row, col }) => ({ row: -row, col }))
      : rotatedShape;
  
    setRotation(newRotation); // Update rotation
    setPreviewBlock((prevPreview) => {
      if (!prevPreview || prevPreview.length === 0) return [];
  
      const targetRow = prevPreview[0].row; // Reference row from current preview
      const targetCol = prevPreview[0].col; // Reference column from current preview
  
      return finalShape.map(({ row, col }) => ({
        index: (targetRow + row) * 11 + (targetCol + col),
        row: targetRow + row,
        col: targetCol + col,
        type: selectedBlock,
      }));
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " ") {
        event.preventDefault(); // Prevent scrolling
        inverseBlock(); // Flip the block instead of rotating
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inverseBlock, selectedBlock]);
  
  

  const handleReset = () => {
    setBlocks([]);
    setUsedBlocks([]);
    setSelectedBlock(null);
    setPreviewBlock([]);
    setRotation(0);
    setIsInverted(false); 

  };

  // Renderöi näkymä
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-red-500 my-4">
        Kanoodle
      </h1>
      <Infopanel />
      <Timer
        seconds={120}
        setIsRunning={setIsRunning}
        gameOver={gameOver}
        setGameOver={setGameOver}
        handleGameReset={handleGameReset}
        resetGame={resetGame}
        isRunning={isRunning}
        onRandomBlock={generateRandomBlock}
        hasClickedRandom={hasClickedRandom}
        setHasClickedRandom={setHasClickedRandom}
      />
      <div className="grid grid-cols-11 w-96 mt-5 border p-2" id="game-board">
        {Array.from({ length: 55 }, (_, index) => {
          const isFilled = blocks.some((block) => block.position === index);
          const isPreview = previewBlock.some((block) => block.index === index);
          const blockType = blocks.find(
            (block) => block.position === index
          )?.type;
          const previewType = previewBlock.find(
            (block) => block.index === index
          )?.type;

          return (
            <div
              key={index}
              className={`box border ${isFilled ? "filled" : ""} ${
                isPreview ? "preview" : ""
              }`}
              onMouseEnter={() => handleGridHover(index)}
              onMouseLeave={handleGridLeave}
              onClick={() => handleGridClick(index)}
              onContextMenu={(e) => {
                e.preventDefault();
                rotateBlock();
              }}
            >
              {isFilled && renderBlock(blockType)}
              {isPreview && renderBlock(previewType, true)}
            </div>
          );
        })}
      </div>
      <Blocks handleBlockClick={(blockType) => setSelectedBlock(blockType)} />
    </>
  );
};

export default Field;
