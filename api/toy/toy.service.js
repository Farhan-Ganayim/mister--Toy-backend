import { ObjectId } from "mongodb"

import { dbService } from "../../servicesDB/db.service.js"
import { loggerService } from "../../servicesDB/logger.service.js"
import { utilService } from "../../servicesDB/util.service.js"

export const toyService = {
    query,
    getById,
    remove,
    // add,
    update,
    // addToyMsg,
    // removeToyMsg,
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const sortBy = _buildSort(filterBy.sortBy)

        const collection = await dbService.getCollection('toy')
        const toys = await collection.find(criteria).sort(sortBy).toArray()
        return toys

    } catch (err) {
        loggerService.error('toyService: cannot load toys', err)
        throw err
    }

}

async function getById(toyId) {

    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ _id: ObjectId.createFromHexString(toyId) })
        return toy
    }
    catch (err) {
        loggerService.error(`toyService: while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(toyId) })
    } catch (err) {
        loggerService.error(`toyService: cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        const { name, price, labels, inStock } = toy
        const collection = await dbService.getCollection('toy')
        const toyToUpdate = {
            name,
            price,
            labels,
            inStock,
            updatedAt: Date.now(),
        }
        await collection.updateOne(
            { _id: ObjectId.createFromHexString(toy._id) },
            { $set: toyToUpdate }
        )
        // return { ...toyToUpdate, _id: toy._id }
        return toy
    } catch (err) {
        loggerService.error(`toyService : cannot update toy ${toy._id}`, err)
        throw err
    }
}



function _buildCriteria(filterBy) {
    const { txt, inStock, labels } = filterBy
    const criteria = {}
    if (txt) criteria.name = { $regex: txt, $options: 'i' }
    if (inStock !== undefined) {
        criteria.inStock = inStock === 'true' ? true : false
        // criteria.inStock = inStock === 'true' ? true : false   json.parse
    }
    if (labels && labels.length) criteria.labels = { $all: labels }
    console.log('CCCCCCCC', criteria)
    loggerService.debug('Criteria', criteria)
    return criteria
}

function _buildSort(sortBy = {}) {
    if (!sortBy.type) return {}
    const dir = +sortBy.sortDir
    return { [sortBy.type]: dir }
}

