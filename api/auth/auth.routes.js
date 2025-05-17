import express from 'express'
import { authController, login } from './auth.controller.js'

export const authRoutes = express.Router()

authRoutes.post('/login', authController.login)
authRoutes.post('/signup', authController.signup)
authRoutes.post('/logout', authController.logout)