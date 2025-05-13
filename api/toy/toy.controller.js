import { toyService } from "./toy.service"
import { loggerService } from "../../services/logger.service"

export const toyController = {
    getToys,
    getToyById,
}

async function getToys(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || "",
            inStock: req.query.inStock || undefined,
            labels: req.query.labels || null,
            sortBy: req.query.sortBy
        }
        loggerService.debug('Trying to get toys with filterBy', filterBy)
        const toys = await toyService.query(filterBy)
        res.send(toys)

    }
    catch (err) {
        loggerService.error('Failed to get toys', err)
        res.status(500).send('Failed to get toys')

    }
}
export async function getToyById(req, res) {
    try {
        const { toyId } = req.params
        const toy = await toyService.getById(toyId)
        res.send(toy)
    } catch (error) {
        loggerService.error('Cannot get toy', error)
        res.status(500).send(error)
    }
}