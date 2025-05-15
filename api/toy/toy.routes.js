import express from 'express'
import { toyController } from './toy.controller.js'
import { loggerService } from '../../servicesDB/logger.service.js'

export const toyRoutes = express.Router()

toyRoutes.get('/', toyController.getToys)
toyRoutes.get('/:toyId', toyController.getToyById)
toyRoutes.delete('/:toyId', toyController.removeToy)
toyRoutes.put('/:toyId', toyController.updateToy)
toyRoutes.post('/', toyController.addToy)
