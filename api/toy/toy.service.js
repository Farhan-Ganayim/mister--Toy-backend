import { ObjectId } from "mongodb"

import { dbService } from "../../servicesDB/db.service"
import { logger } from "../../servicesDB/logger.service"
import { utilService } from "../../services/util.service"
import { loggerService } from "../../services/logger.service"

export const toyService = {
    query,
    getById,
    // remove,
    // add,
    // update,
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
        logger.error('cannot load toys', err)
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
        loggerService.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {

    const { txt, inStock, labels } = filterBy
    const criteria = {}
    if (txt) criteria = { name: { $regex: txt, $options: 'i' } }

    if (inStock !== undefined) {
        criteria.inStock = inStock === 'true' ? true : false
    }

    if (labels && labels.length) criteria.labels = { $all: labels }

    return criteria
}

function _buildSort(sortBy = {}) {
    if (!sortBy.type) return {}
    const dir = +sortBy.sortDir
    return { [sortBy.type]: dir }

}


