import { Router } from 'express'
import { requireToken } from '../middleware/requireToken'
import { createNote, deleteNote, getAllNotes, getOneNote, updateNote } from '../controllers/notesController'

export const notesRouter = Router()

notesRouter.get('/', requireToken, getAllNotes)

notesRouter.get('/:id', requireToken, getOneNote)

notesRouter.post('/', requireToken,  createNote)

notesRouter.put('/:id', requireToken, updateNote)

notesRouter.delete('/:id', requireToken, deleteNote)