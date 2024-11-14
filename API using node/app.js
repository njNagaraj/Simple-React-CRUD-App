const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database('./ex.db');

app.use(cors());
app.use(express.json());

app.get('/players', (req, res) => {
    db.all('SELECT * FROM players', [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); 
    });
});

app.post('/players', (req, res) => {
    const { name, age } = req.body;
    db.run('INSERT INTO players (Name, Age) VALUES (?, ?)', [name, age], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });  
});

app.put('/players/:id', (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;
    db.run('UPDATE players SET Name = ?, Age = ? WHERE id = ?', [name, age, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });  
    });
});

app.delete('/players/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM players WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });  
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
})


