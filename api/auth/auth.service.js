import bcrypt from 'bcrypt'
import Cryptr from 'cryptr'
import { loggerService } from '../../servicesDB/logger.service.js'
import { userService } from '../user/user.service.js'

export const authService = {
    login,
    signup,
    getLoginToken,
    validateToken,
}

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

async function login(username, password) {
    try {
        const user = await userService.getByUsername(username)
        if (!user) throw new Error('Invalid username or password')
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error('Invalid username or password')

        delete user.password
        return user
    } catch (err) {
        loggerService.error('authService: login failed', err)
        throw err
    }
}

async function signup(username, password, fullname) {
    const saltRounds = 10
    loggerService.debug(
        `auth.service - signup with username: ${username}, fullname: ${fullname}`
    )
    try {
        if (!username || !password || !fullname)
            throw new Error('Missing signup details')

        const hash = await bcrypt.hash(password, saltRounds)
        const newUser = { username, password: hash, fullname, isAdmin: false }
        return userService.add(newUser)

    } catch (err) {
        loggerService.error('authService: signup failed', err)
        throw err
    }
}

function getLoginToken(user) {
    const userInfo = {
        _id: user._id,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
    }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}