const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database setup
const db = new sqlite3.Database("leaderboard.db", (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game TEXT NOT NULL,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
      )`
    );
  }
});

// Get leaderboard filtered by game
app.get("/leaderboard", (req, res) => {
  const { game } = req.query;

  const query = game
    ? "SELECT * FROM leaderboard WHERE game = ? ORDER BY score DESC LIMIT 10"
    : "SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10";

  db.all(query, game ? [game] : [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add new score
app.post("/leaderboard", (req, res) => {
  const { game, name, score } = req.body;

  if (!game) {
    return res.status(400).json({ error: "Game is not set contanct backend idiot." });
  }
  
  if (!name || score == null) {
    return res.status(400).json({ error: "Name and score are required." });
  }

  db.run(
    "INSERT INTO leaderboard (game, name, score) VALUES (?, ?, ?)",
    [game, name, score],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, score });
    }
  );
});

// Reset leaderboard
app.delete("/leaderboard", (req, res) => {
  db.run("DELETE FROM leaderboard", [], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Leaderboard reset successful." });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
