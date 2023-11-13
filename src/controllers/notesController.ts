import { Response } from 'express'
import { prisma } from '../database'
import { CustomRequest } from '../middleware/requireToken'

export async function getAllNotes (req: CustomRequest, res: Response) {
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.userId
      }
    })
    notes.reverse()
    res.json({ notes })
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error })
    } else {
      res.status(500).json({ error: 'Error de servidor' })
    }
  }
}

export async function getOneNote (req: CustomRequest, res: Response) {
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: req.params.id
      }
    })
    res.json({ note })
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}

export async function createNote (req: CustomRequest, res: Response) {
  try {
    const createNote = await prisma.note.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        user: {
          connect: {
            id: req.userId
          }
        }
      }
    })
    res.status(201).json({ createNote })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Error de servidor' })
    }
  }
}

export async function deleteNote (req: CustomRequest, res: Response) {
  try {
    const deleteNote = await prisma.note.delete({
      where: {
        id: req.params.id
      }
    })
    res.json({ deleteNote })
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}

export async function updateNote (req: CustomRequest, res: Response) {
  try {
    const updateNote = await prisma.note.update({
      where: {
        id: req.params.id
      },
      data: {
        title: req.body.title,
        body: req.body.body
      }
    })
    res.json({ updateNote })
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}