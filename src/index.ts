import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import { userRouter } from './router/user.routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', userRouter)
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log('Server running in port ' + process.env.PORT))