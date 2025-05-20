
import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { loggerService } from './servicesDB/logger.service.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.set('query parser', 'extended')

if (process.env.NODE_ENV === 'production') {
    console.log("🚀 ~ process.env.NODE_ENV:", process.env.NODE_ENV)
    app.use(express.static('public'))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:5174',
            'http://127.0.0.1:5174',
        ],
        credentials: true,
    }
    app.use(cors(corsOptions))
}
// app.use(express.static('public'))

import { toyRoutes } from './api/toy/toy.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'

app.use('/api/toy', toyRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/*all', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const port = process.env.PORT || 3030
app.listen(port, () => {
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
})