import { Request, Response, NextFunction } from 'express'
import Jwt, {} from 'jsonwebtoken'
import { tokenVerificatiosErrors } from '../utils/tokenManager'

export interface CustomRequest extends Request {
  userId?: string; // Define la propiedad userId opcional
}

export const requireToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization
    let token: string

    if (authorization) token = authorization.split(' ')[1]
  
    if (token!) {
      const decoded = Jwt.verify(token!, process.env.JWT_SECRET!) as { id?: string }
      req.userId = decoded.id 
      next()
    } else {
      res.status(401).json({ error: 'Debes iniciar session' })
    }
  } catch (error) {
    if (error instanceof Error) {
    res
      .status(401)
      .send({ error: tokenVerificatiosErrors[error.message] })
    }
  }
}