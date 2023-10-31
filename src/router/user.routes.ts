import { Router } from 'express'
import { prisma } from '../database'

export const userRouter = Router()

userRouter.get('/', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.json(allUsers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ocurrio un error al obtener los usuarios' })
  }
})