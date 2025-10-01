import express from 'express'
import cors from 'cors'
import games from './api/games.json' assert { type: 'json' }

const app = express()
const port = '3000'

app.use(cors())
app.use(express.json())

app.get('/api/games', (req, res) => {
    res.json(games)
})

app.get('/api/games/:id', (req, res) => {
    const gameId = parseInt(req.params.id, 10)
    const game = games.find(game => gameId === game.id)
    if (!game) {
        return res.status(404).json({ message: 'Game not found' })
    }
    res.json(game)
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})