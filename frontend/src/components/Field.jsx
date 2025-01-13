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

      const previewPositions = shape.map(({ row, col }) => ({
        index: (targetRow + row) * 11 + (targetCol + col),
        row: targetRow + row,
        col: targetCol + col,
        type: blockType,
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

    const previewPositions = shape.map(({ row, col }) => ({
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
    if (!selectedBlock) return;

    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;

    const shapeData = blockShapes[selectedBlock];
    const rotations = shapeData.rotations || [shapeData];
    const shape = rotations[(rotation / 90) % rotations.length];

    const newPositions = shape.map(({ row, col }) => ({
      index: (targetRow + row) * 11 + (targetCol + col),
      row: targetRow + row,
      col: targetCol + col,
      type: selectedBlock,
    }));

    const isOutOfBounds = newPositions.some(
      ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
    );

    const isOverlapping = newPositions.some(({ index }) =>
      blocks.some((block) => block.position === index)
    );

    if (!isOutOfBounds && !isOverlapping) {
      setBlocks((prev) => [
        ...prev,
        ...newPositions.map(({ index }) => ({
          type: selectedBlock,
          position: index,
        })),
      ]);
      setUsedBlocks((prev) => [...prev, selectedBlock]);
      setSelectedBlock(null);
      setPreviewBlock([]);
      setRotation(0);
    }
  };

  const rotateBlock = () => setRotation((prev) => (prev + 90) % 360);

  const handleReset = () => {
    setBlocks([]);
    setUsedBlocks([]);
    setSelectedBlock(null);
    setPreviewBlock([]);
    setRotation(0);
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
