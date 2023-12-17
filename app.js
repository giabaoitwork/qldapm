const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const Level = require('./Level')
const Game = require('./Game')
const Round = require('./Round')
const Player = require('./Player')
const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
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
const storage = new Storage({
    keyFilename: path.join(__dirname, 'steady-tracer-406604-e5d8ca3e821e.json'),
});

const bucketName = 'image_qlda';
const bucket = storage.bucket(bucketName);

const upload = multer({
    storage: multer.memoryStorage(),
});
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

app.post('/api/create_game', async (req, res) => {
    try {
        const { suggest, gameTime } = req.body
        const [result] = await connection.query("INSERT INTO game (suggest, game_time) VALUES (?, ?)", [suggest, gameTime]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Game created successfully with id: ${result.insertId}`, id: result.insertId });
        } else {
            res.status(500).json({ error: 'Failed to create game' });
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})


app.post('/api/create_round', async (req, res) => {
    try {
        const { gameId, levelId, src, srcOther } = req.body
        const [result] = await connection.query("INSERT INTO round (game_id, level_id, src, src_other) VALUES (?, ?, ?, ?)", [gameId, levelId, src, srcOther]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Rounds created successfully' });
        } else {
            res.status(500).json({ error: 'Failed to create game' });
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.get('/api/maxLevel', async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT MAX(id) as maxlevel FROM level")
        if (rows.length > 0) {
            res.status(200).json({ maxLevel: rows[0].maxlevel })
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

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const { gameId, levelId } = req.body;
        const blob = bucket.file(`${gameId}/lv${levelId}/${req.file.originalname}`);
        const blobStream = blob.createWriteStream();
        blobStream.on('error', (err) => {
            console.error(err);
            res.status(500).send('Error uploading image');
        });

        blobStream.on('finish', () => {
            res.status(200).json({ message: 'Image uploaded successfully' });
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error uploading image');
    }
});

app.get('/api/rank/:id', async (req, res) => {
    try {
        const gameId = req.params.id
        const [rows] = await connection.query("SELECT name, score, time_end FROM player WHERE game_id = ? ORDER BY score DESC, time_end ASC;", [gameId])
        if (rows.length > 0) {
            const dataArray = [];

            for (const row of rows) {
                const dataObject = {
                    name: row.name,
                    score: row.score,
                    timeEnd: row.time_end
                };
                dataArray.push(dataObject);
            }

            res.status(200).json(dataArray);
        }
        else {
            res.status(500).json({ error: 'Player not found' })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.get('/api/player/:id', async (req, res) => {
    try {
        const gameId = req.params.id
        const [rows] = await connection.query("SELECT * FROM player WHERE game_id = ?", [gameId])
        if (rows.length > 0) {
            const dataArray = [];

            for (const row of rows) {
                dataArray.push(new Player(row.name, row.phone_number, row.email, row.score, row.time_end));
            }

            res.status(200).json(dataArray);
        }
        else {
            res.status(500).json({ error: 'Player not found' })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.post('/api/save_user', async (req, res) => {
    try {
        const { name, phone, email, score, time, game_id } = req.body
        const [rows] = await connection.query("INSERT into player (name, phone_number, email, score, time_end, game_id) VALUES (?,?,?,?,?,?)", [name, phone, email, score, time, game_id])
        if (rows.affectedRows > 0) {
            res.status(200).json({ message: "User add successfully" })
        }
        else {
            res.status(500).json({ error: 'Fail to add user' })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.listen(process.env.PORT, () => console.log('App listening on port 4000'));