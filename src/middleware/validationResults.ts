import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const validationResults = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg })
  }
  next()
}

export const validatiosNotes =[
  body('title', 'El titulo es obligatorio').not().isEmpty(), 
  body('body', 'El body es obligatorio').not().isEmpty()
]

export const validatorAuthSignIn = [
  body('email', 'El email es obligatorio').not().isEmpty(),
  body('email', 'El formato de email es invalido').isEmail(),
  body('password', 'La contraseña es obligatoria').not().isEmpty(),
]

export const validatorAuthSignUp = [
  body('email', 'El email es obligatorio').not().isEmpty(),
  body('email', 'El formato de email es invalido').isEmail(),
  body('name', 'El nombre es obligatorio').not().isEmpty(),
  body('password', 'La contraseña es obligatoria').not().isEmpty(),
  body('password', 'La contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
]

