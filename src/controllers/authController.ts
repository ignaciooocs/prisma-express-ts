import { Request, Response, NextFunction } from 'express'
import { prisma } from '../database'
import bcrypt from 'bcrypt'
import { generateRefreshToken, generateToken, tokenVerificatiosErrors } from '../utils/tokenManager'
import { CustomRequest } from '../middleware/requireToken'

export async function SignIn (req: Request, res: Response, next: NextFunction): Promise<void> {
  const body = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    if (!user) throw new Error("Email o contraseña incorrectos")

    const verifyPassword = await bcrypt.compare(body.password, user.password)
    if (!verifyPassword) throw new Error('Email o contraseña incorrectos')

    const { token, expiresIn } = generateToken(user.id) as { token: string, expiresIn: number }
    generateRefreshToken(user.id, res)

    res.status(200).json({ name: user.name, email: user.email, token, expiresIn })
  } catch (error) {
    next(error)
  }
}

export async function SignUp (req: Request, res: Response, next: NextFunction): Promise<void> {
  const body = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(body.password, salt)
    if (!hashPassword) throw new Error('No se encripto la contraseña')

    const userCreated = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword
      }
    })
    res.status(201).json(userCreated)
  } catch (error) {
    next(error)
  } finally {
    await prisma.$disconnect()
  }
}

export function UserProfile (req: CustomRequest, res: Response) {
  res.json({ profile: req.userId })
}

export function RefreshToken (req: CustomRequest, res: Response): void {
  try {
    const { token } = generateToken(req.userId!) as { token: string }

    res.status(201).json({ refresh: token })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(401)
        .send({ error: tokenVerificatiosErrors[error.message] })
    }
  }
}