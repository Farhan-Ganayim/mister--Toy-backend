import { loggerService } from "../../servicesDB/logger.service.js"
import { userService } from "./user.service.js"

export const userController = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser,
}

async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || '',
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        loggerService.error('Controller: Failed to get users', err)
        res.status(500).send('Failed to get users')
    }
}

async function getUserById(req, res) {
    try {
        const { userId } = req.params
        const user = await userService.getById(userId)
        res.send(user)
    } catch (err) {
        loggerService.error('Controller: Failed to get user', err)
        res.status(500).send('Failed to get user')
    }
}

async function addUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.add(user)
        res.send(savedUser)
    } catch (err) {
        loggerService.error('Controller: Failed to add user', err)
        res.status(500).send('Failed to add user')
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const updatedUser = await userService.update(user)
        res.send(updatedUser)
    } catch (err) {
        loggerService.error('Controller: Failed to update user', err)
        res.status(500).send('Failed to update user')
    }
}

async function removeUser(req, res) {
    try {
        const { userId } = req.params
        await userService.remove(userId)
        res.send(userId)
    } catch (err) {
        loggerService.error('Controller: Failed to remove user', err)
        res.status(500).send('Failed to remove user')
    }
}