import express from 'express'
import bodyParser from 'body-parser'

import gameRoutes from './routes/game'

const PORT = 3000

const app = express()
app.use(bodyParser.json())

app.use(gameRoutes)

app.listen(PORT)
