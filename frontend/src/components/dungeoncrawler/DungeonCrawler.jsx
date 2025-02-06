// DungeonCrawler.jsx
import { useState, useEffect } from 'react';

const DUNGEON_SIZE = 10;
const SAVE_KEY = 'dungeonCrawlerSave';

// Initial game state
const initialGameState = {
  playerPos: { x: 0, y: 0 },
  dungeon: [],
  health: 100,
  score: 0,
  inventory: [],
  inCombat: false,
  currentEnemy: null
};

const DungeonCrawler = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const [showCombat, setShowCombat] = useState(false);
  
  // Load saved game
  useEffect(() => {
    const savedGame = localStorage.getItem(SAVE_KEY);
    if (savedGame) {
      setGameState(JSON.parse(savedGame));
    } else {
      generateNewDungeon();
    }
  }, []);

  // Save game automatically on changes
  useEffect(() => {
    if (gameState.dungeon.length > 0) {
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const generateNewDungeon = () => {
    const grid = Array(DUNGEON_SIZE).fill().map(() => 
      Array(DUNGEON_SIZE).fill('floor')
    );

    // Generate content ensuring starting position is safe
    for (let y = 0; y < DUNGEON_SIZE; y++) {
      for (let x = 0; x < DUNGEON_SIZE; x++) {
        if (x === 0 && y === 0) continue; // Starting position
        
        const rand = Math.random();
        if (rand < 0.2) grid[y][x] = 'enemy';
        else if (rand < 0.3) grid[y][x] = 'treasure';
        else if (rand < 0.35) grid[y][x] = 'health_potion';
      }
    }

    setGameState(prev => ({
      ...prev,
      dungeon: grid,
      playerPos: { x: 0, y: 0 },
      health: 100,
      score: 0,
      inventory: []
    }));
  };

  const handleMovement = (newX, newY) => {
    const cell = gameState.dungeon[newY][newX];
    const newDungeon = [...gameState.dungeon];
    let newState = { ...gameState };

    // Handle cell content
    switch(cell) {
      case 'enemy':
        setShowCombat(true);
        newState.currentEnemy = { x: newX, y: newY, health: 50 };
        break;
        
      case 'treasure':
        newState.inventory = [...newState.inventory, { id: Date.now(), type: 'treasure' }];
        newState.score += 50;
        newDungeon[newY][newX] = 'floor'; // Remove treasure
        break;
        
      case 'health_potion':
        newState.inventory = [...newState.inventory, { id: Date.now(), type: 'health_potion' }];
        newDungeon[newY][newX] = 'floor';
        break;
    }

    setGameState(prev => ({
      ...prev,
      dungeon: newDungeon,
      playerPos: { x: newX, y: newY },
      ...newState
    }));
  };

  const handleCombat = (action) => {
    if (!gameState.currentEnemy) return;

    let enemy = { ...gameState.currentEnemy };
    let playerHealth = gameState.health;
    let inventory = [...gameState.inventory];

    // Player attack
    if (action === 'attack') {
      enemy.health -= Math.floor(Math.random() * 15) + 5;
    }
    
    // Use sword if available
    if (action === 'use_sword' && inventory.some(item => item.type === 'sword')) {
      enemy.health -= Math.floor(Math.random() * 25) + 10;
      inventory = inventory.filter(item => item.type !== 'sword');
    }

    // Enemy counter-attack
    if (enemy.health > 0) {
      playerHealth -= Math.floor(Math.random() * 10) + 5;
    }

    // Update state
    const newState = {
      health: playerHealth,
      inventory,
      currentEnemy: enemy.health > 0 ? enemy : null,
      inCombat: enemy.health > 0
    };

    if (enemy.health <= 0) {
      const newDungeon = [...gameState.dungeon];
      newDungeon[enemy.y][enemy.x] = 'floor';
      newState.dungeon = newDungeon;
      newState.score += 100;
    }

    setGameState(prev => ({ ...prev, ...newState }));
    setShowCombat(newState.inCombat);
    
    if (playerHealth <= 0) {
      alert('Game Over!');
      localStorage.removeItem(SAVE_KEY);
      generateNewDungeon();
    }
  };

  const useInventoryItem = (itemId) => {
    const item = gameState.inventory.find(item => item.id === itemId);
    if (!item) return;

    let newState = { ...gameState };
    
    switch(item.type) {
      case 'health_potion':
        newState.health = Math.min(100, gameState.health + 30);
        break;
      case 'sword':
        // Sword is used in combat, not here
        return;
    }

    newState.inventory = gameState.inventory.filter(item => item.id !== itemId);
    setGameState(newState);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <div>
          Health: {gameState.health} | Score: {gameState.score}
        </div>
        <div className="space-x-2">
          <button 
            onClick={() => localStorage.setItem(SAVE_KEY, JSON.stringify(gameState))}
            className="bg-blue-500 px-2 py-1 rounded"
          >
            Save
          </button>
          <button 
            onClick={generateNewDungeon}
            className="bg-red-500 px-2 py-1 rounded"
          >
            New Game
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="grid grid-cols-10 gap-1 w-[500px]">
          {gameState.dungeon.map((row, y) => 
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`h-12 border ${
                  cell === 'enemy' ? 'bg-red-500' :
                  cell === 'treasure' ? 'bg-yellow-400' :
                  cell === 'health_potion' ? 'bg-green-500' : 'bg-gray-200'
                }`}
                onClick={() => handleMovement(x, y)}
              >
                {x === gameState.playerPos.x && y === gameState.playerPos.y && (
                  <div className="w-full h-full bg-blue-500"></div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="w-48">
          <h3 className="text-lg font-bold mb-2">Inventory</h3>
          <div className="space-y-2">
            {gameState.inventory.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>
                  {item.type.replace('_', ' ')}
                </span>
                {item.type === 'health_potion' && (
                  <button 
                    onClick={() => useInventoryItem(item.id)}
                    className="bg-green-500 px-2 py-1 rounded text-sm"
                  >
                    Use
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Combat Modal */}
      {showCombat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Combat!</h2>
            <div className="mb-4">
              Enemy Health: {gameState.currentEnemy?.health}
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => handleCombat('attack')}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Attack
              </button>
              {gameState.inventory.some(item => item.type === 'sword') && (
                <button 
                  onClick={() => handleCombat('use_sword')}
                  className="bg-yellow-500 px-4 py-2 rounded"
                >
                  Use Sword
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DungeonCrawler;