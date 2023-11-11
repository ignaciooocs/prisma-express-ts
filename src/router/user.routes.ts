import { Router } from 'express'
import { requireToken } from '../middleware/requireToken'
import { requireRefreshToken } from '../middleware/requireRefreshToken'
import { SignIn, SignUp, UserProfile, RefreshToken } from '../controllers/authController'

export const userRouter = Router()

userRouter.post('/sign-in', SignIn)

userRouter.post('/sign-up', SignUp)

userRouter.get('/profile', requireToken, UserProfile)

userRouter.get('/refresh', requireRefreshToken, RefreshToken)