import express from 'express'
import { userController } from './user.controller.js'

export const userRoutes = express.Router()

userRoutes.get('/', userController.getUsers)
userRoutes.get(':userId', userController.getUserById)
userRoutes.put('/:userId', userController.updateUser)
userRoutes.post('/', userController.addUser)
userRoutes.delete('/:userId', userController.removeUser)