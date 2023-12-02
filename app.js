const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const Level = require('./Level')
const cors = require('cors');
require('dotenv').config();
app.use(cors());
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

app.get('/api/test'), async (req, res) => {
    req.json({ mess: 'test' })
}

app.get('/api/level/:id', async (req, res) => {
    try {
        const levelId = req.params.id
        const [rows] = await connection.query("SELECT id, level.row, col, bonus_score, minus_score FROM level WHERE id = ?", [levelId])
        if (rows.length > 0) {
            res.status(200).json(new Level(rows[0].id, rows[0].row, rows[0].col, rows[0].bonus_score, rows[0].minus_score))
        }
        else {
            res.status(500).status({ error: 'Level not found' })
        }
    }
    catch (error) {
        res.status(500).status({ error: 'Internal Server Error' })
    }
})

app.listen(process.env.PORT, () => console.log('App listening on port 4000'));