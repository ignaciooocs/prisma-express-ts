import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { tokenVerificatiosErrors } from '../utils/tokenManager'
import { CustomRequest } from './requireToken'

export const requireRefreshToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as { id?: string }
      req.userId = decoded.id 
      next()
    } else {
      res.status(401).json({ error: 'No existe el refresh token' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(401)
        .send({ error: tokenVerificatiosErrors[error.message] })
      }
  }
}