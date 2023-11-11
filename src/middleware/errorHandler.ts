import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {ErrorRequestHandler, Request, Response, NextFunction} from 'express'


export const errorHandler = (error: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error) {
    if (error instanceof PrismaClientInitializationError) return res.status(402).json({ error: 'Error de conexion a prisma' })
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') return res.status(404).json({ error: 'El email ya esta en uso' })
    }
    return res.status(400).json({ error: error.message})
  } else {
    return res.status(500).json({ error: 'Error de servidor' })
  }
}