import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Blocks from "./Blocks";
import blockShapes from "./blockShapes";
import Infopanel from "./Infopanel";

const Field = ({ isRunning, resetGame, setGameOver, currentBlock }) => {
  const [blocks, setBlocks] = useState([]); // Pelissä olevat palikat
  const [selectedBlock, setSelectedBlock] = useState(null); // Valittu palikka
  const [previewBlock, setPreviewBlock] = useState([]); // Esikatselu palikka
  const [rotation, setRotation] = useState(0); // Palikan kulma
  const [usedBlocks, setUsedBlocks] = useState([]); // Käytetyt palikat

  const handleReset = () => {
    setBlocks([]); // Tyhjennä kenttä
    setUsedBlocks([]); // Tyhjennä käytetyt palikat
    setSelectedBlock(null); // Poista valittu palikka
    setPreviewBlock([]); // Tyhjennä esikatselu
    setRotation(0); // Nollaa kulma
  };

  // Aseta satunnainen palikka kentälle
  const placeRandomBlock = (blockType) => {
    // Tarkistetaan, onko palikka jo käytetty
    if (usedBlocks.includes(blockType)) {
      console.log(`${blockType} already used!`);
      return; // Jos palikka on jo käytetty, ei aseteta sitä
    }
  
    // Tarkistetaan, onko blockType kelvollinen
    const shapeData = blockShapes[blockType];
    if (!shapeData) {
      console.error(`${blockType} is not a valid block type.`);
      return;
    }
  
    // Käytetään palikan rotaatioita, jos niitä on, muuten käytetään oletusmuotoa
    const rotations = shapeData.rotations || [shapeData];
    let placed = false;
  
    while (!placed) {
      // Valitaan satunnainen paikka kentällä (kenttä 5x11)
      const randomPosition = Math.floor(Math.random() * 55);
      const targetRow = Math.floor(randomPosition / 11);
      const targetCol = randomPosition % 11;
  
      // Valitaan satunnainen rotaatio
      const rotationIndex = Math.floor(Math.random() * rotations.length);
      const shape = rotations[rotationIndex];
  
      // Määritetään palikan paikat kentällä (kenttä 5x11)
      const previewPositions = shape.map(({ row, col }) => ({
        index: (targetRow + row) * 11 + (targetCol + col),
        row: targetRow + row,
        col: targetCol + col,
        type: blockType,
      }));
  
      // Tarkistetaan, meneekö palikka ulos kentältä
      const isOutOfBounds = previewPositions.some(
        ({ row, col }) => row < 0 || col < 0 || col >= 11 || row >= 5
      );
  
      // Jos palikka ei mene ulos kentältä, asetetaan se
      if (!isOutOfBounds) {
        // Asetetaan palikka kentälle
        setBlocks((prev) => [
          ...prev,
          ...previewPositions.map(({ index }) => ({ type: blockType, position: index })),
        ]);
        setSelectedBlock(blockType);
        setUsedBlocks((prev) => [...prev, blockType]); // Lisätään palikka käytettyihin
        placed = true;
      }
    }
  };
  
  

  // Käsittele satunnaisen palikan asettamista
  useEffect(() => {
    if (currentBlock) {
      placeRandomBlock(currentBlock);
    }
  }, [currentBlock]);

  // Käsittele palikan valintaa
  const handleBlockClick = (blockType) => {
    if (!isRunning) {
      alert("The game is not running! Press Start to begin.");
      return;
    }
    if (usedBlocks.includes(blockType)) {
      alert("This block has already been used!");
      return;
    }
    setSelectedBlock(blockType);
    setPreviewBlock([]); // Poista esikatselu
  };

  // Käännä palikkaa 90 astetta
  const rotateBlock = () => {
    if (!selectedBlock) return;
    setRotation((prev) => (prev + 90) % 360);
  };

  // Käsittele ruudukon hover-tapahtuma
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

    if (isOutOfBounds) {
      setPreviewBlock([]); // Poista esikatselu
      return;
    }

    setPreviewBlock(previewPositions);
  };

  // Käsittele ruudukon "mouseleave" -tapahtuma
  const handleGridLeave = () => {
    setPreviewBlock([]); // Poista esikatselu
  };

  // Tarkista, onko peli voitetty
  const checkIfWon = () => {
    const allDivs = document.querySelectorAll(".box");
    const filledDivs = document.querySelectorAll(".filled");
    if (allDivs.length === filledDivs.length && filledDivs.length > 0) {
      setGameOver(true);
      alert("You won!");
    }
  };

  // Käsittele ruudukon klikkaamista
  const handleGridClick = (index) => {
    if (!isRunning) {
      alert("The game is not running! Press Start to begin.");
      return;
    }
    if (!selectedBlock) return;

    const targetRow = Math.floor(index / 11);
    const targetCol = index % 11;

    const shapeData = blockShapes[selectedBlock];
    const shape = shapeData.rotations
      ? shapeData.rotations[(rotation / 90) % shapeData.rotations.length]
      : shapeData;

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

    setBlocks((prev) => [
      ...prev,
      ...newPositions.map(({ index }) => ({ type: selectedBlock, position: index })),
    ]);
    setUsedBlocks((prev) => [...prev, selectedBlock]);
    setSelectedBlock(null);
    setPreviewBlock([]); // Tyhjennä esikatselu
    setRotation(0); // Nollaa kulma
  };

  // Renderöi palikka kentälle
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

  useEffect(() => {
    if (selectedBlock) {
      setPreviewBlock([]); // Tyhjennä esikatselu kun palikka on valittu
    }
  }, [rotation, selectedBlock]);

  useEffect(() => {
    checkIfWon(); // Tarkista voitto joka kerta kun kenttä päivittyy
  }, [blocks]);

  useEffect(() => {
    if (resetGame) {
      handleReset(); // Nollaa peli resetin aikana
    }
  }, [resetGame]);

// Rotate the block when spacebar is pressed
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault(); // Prevent scrolling
      rotateBlock();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [rotateBlock]);

  return (
    <>
      <Infopanel />
      <div className="grid grid-cols-11 w-96 mt-5 border p-2" id="game-board">
        {Array.from({ length: 55 }, (_, index) => (
          <div
            key={index}
            className={`box border transition-colors duration-200 ${
              blocks.some((block) => block.position === index) ? "filled" : ""
            }`}
            onMouseEnter={() => handleGridHover(index)}
            onMouseLeave={handleGridLeave}
            onClick={() => handleGridClick(index)}
            onContextMenu={(e) => {
              e.preventDefault();
              rotateBlock(); // Käännä palikka oikealla klikkauksella
            }}
          >
            {blocks
              .filter((block) => block.position === index)
              .map((block, i) => (
                <div key={i}>{renderBlock(block.type)}</div>
              ))}
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

Field.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  resetGame: PropTypes.bool.isRequired,
  setGameOver: PropTypes.func.isRequired,
  currentBlock: PropTypes.string, // Satunnainen palikka
};

export default Field;
