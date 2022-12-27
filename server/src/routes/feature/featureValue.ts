import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

router.post('/', async (req: Request, res: Response) => {})

router.get('/:id', async (req: Request, res: Response) => {})

router.patch('/:id', async (req: Request, res: Response) => {})

router.delete('/:id', async (req: Request, res: Response) => {})

export default router
