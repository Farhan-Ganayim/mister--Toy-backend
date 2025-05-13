import express from 'express'
import { toyController } from './toy.controller.js'
import { loggerService } from '../../servicesDB/logger.service.js'

export const toyRoutes = express.Router()

toyRoutes.get('/', toyController.getToys)
toyRoutes.get('/:id', toyController.getToyById)
// toyRoutes.post('/', toyController.saveToy)
// toyRoutes.put('/:id', toyController.saveToy)
// toyRoutes.delete('/:id', toyController.deleteToy)
