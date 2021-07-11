import { Router } from 'express'

const router = Router()
type MoveRequestBody = { gameId: string; column: number }
type MoveRequestParams = { gameId: string }

router.get('/init', (req, res, next) => {
    throw new Error('not yet implemented')
})

router.post('/move/:gameId', (req, res, next) => {
    const params = req.params as MoveRequestParams
    const body = req.body as MoveRequestBody
    const gameId = params.gameId
    throw new Error('not yet implemented')
})

export default router
