import { Response } from 'express'
import Jwt from 'jsonwebtoken'

export interface ITokenVerificationErrors {
  'invalid signature': string,
  'jwt expired': string,
  'invalid token': string,
  'jwt malformed': string,
  [key: string]: string;
}

export const generateToken = (id: string): { token: string, expiresIn: number } | { error: string } => {
  const expiresIn = 60*5

  try {
    const token = Jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn })
    return { token, expiresIn }
  } catch (error) {
    console.log(error)
    return { error: 'No se genero el token'}
  }
}

export const generateRefreshToken = (id: string, res: Response): void => {
  const expiresIn = 60 * 60 * 24 * 30
  try {
    const refreshToken = Jwt.sign({ id }, process.env.REFRESH_SECRET!, { expiresIn })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: false,
      expires: new Date(Date.now() + expiresIn * 1000),
      sameSite: 'none'
    })
  } catch (error) {
    console.log(error)
  }
}

export const tokenVerificatiosErrors: ITokenVerificationErrors = {
  'invalid signature': 'La firma del JWT no es valida',
  'jwt expired': 'JWT expirado',
  'invalid token': 'Token no es valido',
  'jwt malformed': 'JWT formato no valido' 
}

tokenVerificatiosErrors['invalid signature']