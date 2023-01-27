import express from 'express'
import * as dotenv from 'dotenv'
import userRoutes  from './routes/user'
import { protect } from './modules/auth'
import postRoutes from './routes/post'
import commentRoutes from './routes/comment'

dotenv.config()

const app = express()
const PORT = 1234

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' })
})

app.use('/', userRoutes)
app.use('/api', protect, [postRoutes,commentRoutes])


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})