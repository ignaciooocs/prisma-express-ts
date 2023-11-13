import { Router } from 'express'
import { requireToken } from '../middleware/requireToken'
import { requireRefreshToken } from '../middleware/requireRefreshToken'
import { SignIn, SignUp, UserProfile, RefreshToken, Logout } from '../controllers/authController'
import { validationResults, validatorAuthSignIn, validatorAuthSignUp } from '../middleware/validationResults'

export const userRouter = Router()

userRouter.post('/sign-in', 
  validatorAuthSignIn,
  validationResults,
  SignIn
)

userRouter.post('/sign-up', 
  validatorAuthSignUp,
  validationResults,
  SignUp
)

userRouter.get('/profile', requireToken, UserProfile)

userRouter.get('/refresh', requireRefreshToken, RefreshToken)

userRouter.get('/sign-out', Logout)