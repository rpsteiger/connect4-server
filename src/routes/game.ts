import { Router } from 'express'
import { GameState, MyGameState } from '../models/GameState'
import { GameDB, MyGameDB } from '../models/db/GameDB'

const router = Router()
type MoveRequestBody = { gameId: string; column: number }
type MoveRequestParams = { gameId: string }

router.get('/init', (req, res, next) => {
    const gs: GameState = new MyGameState()
    MyGameDB.getInstance().then(db => {
        db.save(gs).then(saveWorked => {
            if (saveWorked) {
                res.status(200).send({ gameId: gs.gameId })
            } else {
                res.status(500).send({ error: 'error while creating new game' })
            }
        })
    })
})

router.post('/move/:gameId', (req, res, next) => {
    const params = req.params as MoveRequestParams
    const body = req.body as MoveRequestBody
    const gameId = params.gameId
    throw new Error('not yet implemented')
})

export default router
