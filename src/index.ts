import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { userRouter } from './router/user.routes'
import { errorHandler } from './middleware/errorHandler'
import { notesRouter } from './router/notes.routes'

const app = express()

app.use(cors({
  origin: process.env.ORIGIN1,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', userRouter)
app.use('/api/notes', notesRouter)
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log('Server running in port ' + process.env.PORT))