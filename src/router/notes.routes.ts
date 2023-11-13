import { Router } from 'express'
import { requireToken } from '../middleware/requireToken'
import { createNote, deleteNote, getAllNotes, getOneNote, updateNote } from '../controllers/notesController'
import { validationResults, validatiosNotes } from '../middleware/validationResults'

export const notesRouter = Router()

notesRouter.get('/', 
  requireToken, 
  getAllNotes
)

notesRouter.get('/:id', 
  requireToken, 
  getOneNote
)

notesRouter.post('/', 
  requireToken,  
  validatiosNotes, 
  validationResults, 
  createNote
)

notesRouter.put('/:id', 
  requireToken, 
  validatiosNotes,
  validationResults,
  updateNote
)

notesRouter.delete('/:id', 
  requireToken, 
  deleteNote
)