import { Request, RequestHandler, Response, Router } from 'express'
import { body, check, validationResult } from 'express-validator'
import { comparePassword, createJWT, hashPassword } from '../modules/auth'
import db from '../db'

const app = Router()

app.post('/', async (req: Request, res: Response) => {
  try {
    if (!(req.body?.username && req.body?.password)) {
      throw new Error('Invalid body provided')
    }

    const hash = await hashPassword(req.body.password)

    const user = await db.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    })

    const token = createJWT(user)

    return res.status(201).json({ token })
  } catch (e) {
    res.status(400).json({ error: e?.toString() })
  }
})

app.post('/login', async (req: Request, res: Response) => {
  try {
    if (!(req.body?.username && req.body?.password)) {
      throw new Error('Invalid body provided')
    }

    const hash = await hashPassword(req.body.password)

    const user = await db.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    })

    const token = createJWT(user)

    return res.status(201).json({ token })
  } catch (e) {
    res.status(400).json({ error: e?.toString() })
  }
})

export default app
