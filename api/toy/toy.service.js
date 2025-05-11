import { ObjectId } from "mongodb"

import { dbService } from "../../servicesDB/db.service"
import { logger } from "../../servicesDB/logger.service"
import { utilService } from "../../services/util.service"

export const toyService = {
    query,
    getById,
    remove,
    add,
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
        logger.error('cannot load toys', err)

    }

}

function _buildCriteria(filterBy) {
    const { txt, inStock, labels } = filterBy
    const criteria = {}
    if (txt) criteria = { name: { $regex: txt, $options: 'i' } }
}

