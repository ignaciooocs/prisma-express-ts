import 'dotenv/config'
import express from 'express'
import { userRouter } from './router/user.routes'

const app = express()

app.use('/api/auth', userRouter)

app.listen(process.env.PORT, () => console.log('Server running in port ' + process.env.PORT))