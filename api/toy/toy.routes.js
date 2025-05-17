import express from 'express'
import { toyController } from './toy.controller.js'
import { loggerService } from '../../servicesDB/logger.service.js'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const toyRoutes = express.Router()

toyRoutes.get('/', log, toyController.getToys)
toyRoutes.get('/:toyId', toyController.getToyById)
toyRoutes.delete('/:toyId', requireAuth, requireAdmin, toyController.removeToy)
toyRoutes.put('/:toyId', requireAuth, requireAdmin, toyController.updateToy)
toyRoutes.post('/', requireAdmin, requireAdmin, toyController.addToy)


// toyRoutes.post('/:toyId/msg', requireAuth, addToyMsg)
// toyRoutes.delete('/:toyId/msg/:msgId', requireAuth, removeToyMsg)