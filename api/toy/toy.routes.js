import express from 'express'
import { toyController } from './toy.controller.js'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const toyRoutes = express.Router()

toyRoutes.get('/', log, toyController.getToys)
toyRoutes.get('/:toyId', toyController.getToyById)
toyRoutes.delete('/:toyId', requireAuth, toyController.removeToy)
toyRoutes.put('/:toyId', requireAuth, toyController.updateToy)
toyRoutes.post('/', requireAuth, toyController.addToy)

// toyRoutes.get('/', toyController.getToys)
// toyRoutes.get('/:toyId', toyController.getToyById)
// toyRoutes.delete('/:toyId', toyController.removeToy)
// toyRoutes.put('/:toyId', toyController.updateToy)
// toyRoutes.post('/', toyController.addToy)


// toyRoutes.post('/:toyId/msg', requireAuth, addToyMsg)
// toyRoutes.delete('/:toyId/msg/:msgId', requireAuth, removeToyMsg)