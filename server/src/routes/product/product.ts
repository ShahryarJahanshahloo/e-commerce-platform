import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

router.post('/', async (req: Request, res: Response) => {})

router.get('/:id', async (req: Request, res: Response) => {})

router.patch('/:id', async (req: Request, res: Response) => {})

router.delete('/:id', async (req: Request, res: Response) => {})

router.post('/:id/features', async (req: Request, res: Response) => {})

router.delete('/:id/features', async (req: Request, res: Response) => {})

//admin
router.patch('/:id/activate', async (req: Request, res: Response) => {})

//admin
router.patch('/:id/deactivate', async (req: Request, res: Response) => {})

router.get('/category/:id', async (req: Request, res: Response) => {})

router.get('/search', async (req: Request, res: Response) => {})

export default router
