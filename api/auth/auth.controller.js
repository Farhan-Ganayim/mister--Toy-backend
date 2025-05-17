import { loggerService } from "../../servicesDB/logger.service.js"
import { authService } from "./auth.service.js"

export const authController = {
    login,
    signup,
    logout,
}

export async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)

        res.cookie('loginToken', loginToken,)
        res.json(user)
    } catch (err) {
        loggerService.error('Login failed', err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

export async function signup(req, res) {
    try {
        const { username, password, fullname } = req.body
        const user = await authService.signup(username, password, fullname)
        const loginToken = authService.getLoginToken(user)

        res.cookie('loginToken', loginToken)
        res.json(user)

    } catch (err) {
        loggerService.error('Signup failed', err)
        res.status(500).send({ err: 'Signup failed' })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}