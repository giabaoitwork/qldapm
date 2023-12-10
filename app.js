const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const Level = require('./Level')
const Game = require('./Game')
const Round = require('./Round')
const cors = require('cors');
require('dotenv').config();
const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST',
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}
const connection = mysql.createPool(dbConfig);

app.get('/api/game/:id', async (req, res) => {
    try {
        const gameId = req.params.id
        const [rows] = await connection.query("SELECT id, suggest, game_time FROM game WHERE id = ?", [gameId])
        if (rows.length > 0) {
            res.status(200).json(new Game(rows[0].id, rows[0].suggest, rows[0].game_time))
        }
        else {
            res.status(404).json({ error: 'Game not found' })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.get('/api/level/:id', async (req, res) => {
    try {
        const levelId = req.params.id
        const [rows] = await connection.query("SELECT id, level.row, col, bonus_score, minus_score FROM level WHERE id = ?", [levelId])
        if (rows.length > 0) {
            res.status(200).json(new Level(rows[0].id, rows[0].row, rows[0].col, rows[0].bonus_score, rows[0].minus_score))
        }
        else {
            res.status(404).json({ error: 'Level not found' })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.post('/api/round', async (req, res) => {
    try {
        const { gameId, levelId } = req.body
        const [rows] = await connection.query("SELECT src, src_other FROM round WHERE game_id = ? AND level_id = ?", [gameId, levelId])
        if (rows.length > 0) {
            res.status(200).json(new Round(rows[0].src, rows[0].src_other))
        }
        else {
            res.status(404).json({ error: 'round not found' })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }

})

app.listen(process.env.PORT, () => console.log('App listening on port 4000'));