import { Router } from 'express'
import { GameState, MyGameState, Color } from '../models/GameState'
import { GameDB, MyGameDB } from '../models/db/GameDB'

const router = Router()
type MoveRequestBody = { gameId: string; column: number; mover: Color }

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

router.post('/move', (req, res, next) => {
    const body = req.body as MoveRequestBody
    const gameId = body.gameId
    MyGameDB.getInstance().then(db => {
        db.load(gameId).then(state => {
            console.log('state', state)
            if (state) {
                try {
                    const mutatedState = state.move(body.column, body.mover)
                    db.save(mutatedState).then(success => {
                        if (success) {
                            res.status(200).send({ msg: 'move ok' })
                        } else {
                            res.status(500).send({ error: 'error while processing move' })
                        }
                    })
                } catch (err) {
                    res.status(500).send({ error: `error while processing move: ${err}` })
                }
            } else {
                res.status(500).send({ error: `Could not find gameState for gameId: ${gameId}` })
            }
        })
    })
})

export default router
