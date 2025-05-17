import { dbService } from "../../servicesDB/db.service.js"
import { loggerService } from "../../servicesDB/logger.service.js"


import { ObjectId } from "mongodb"

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,

}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('user')
        let users = await collection.find(criteria).toArray()

        users = users.map(user => {
            delete user.password
            return user
        })
        return users
    } catch (err) {
        loggerService.error('userService: cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne(
            { _id: ObjectId.createFromHexString(userId) },
        )
        delete user.password
        return user
    } catch (err) {
        loggerService.error(`userService: cannot find user ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        return await collection.findOne({ username })
    } catch (err) {
        loggerService.error(`userService: cannot find user ${username}`, err)
        throw err
    }
}

export async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(userId) })
    } catch (err) {
        loggerService.error(`userService: cannot remove user ${userId}`, err)
        throw err
    }
}

export async function update(user) {
    try {
        const collection = await dbService.getCollection('user')
        const userToUpdate = {
            fullname: user.fullname,
            username: user.username,
            updatedAt: Date.now(),
        }
        await collection.updateOne(
            { _id: ObjectId.createFromHexString(user._id) },
            { $set: userToUpdate }
        )
        return userToUpdate
    } catch (err) {
        loggerService.error(`userService: cannot update user ${user._id}`, err)
        throw err
    }
}

export async function add(user) {
    try {
        const collection = await dbService.getCollection('user')

        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname || 'New user',
            isAdmin: false,
            createdAt: Date.now(),
        }

        await collection.insertOne(userToAdd)
        return userToAdd

    } catch (err) {
        loggerService.error('userService: cannot add user', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ]
    }
    return criteria
}