import { Router } from 'express'
import { requireToken } from '../middleware/requireToken'
import { createNote, deleteNote, getAllNotes, getOneNote, updateNote } from '../controllers/notesController'
import { validationResults, validatiosNotes } from '../middleware/validationResults'

export const notesRouter = Router()

notesRouter.get('/:page',
  requireToken,
  getAllNotes
)

notesRouter.get('/one/:id',
  requireToken,
  getOneNote
)

notesRouter.post('/',
  requireToken,
  validatiosNotes,
  validationResults,
  createNote
)

notesRouter.put('/one/:id',
  requireToken,
  validatiosNotes,
  validationResults,
  updateNote
)

notesRouter.delete('/one/:id',
  requireToken,
  deleteNote
)