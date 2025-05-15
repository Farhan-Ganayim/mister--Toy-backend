import { toyService } from "./toy.service.js"
import { loggerService } from "../../servicesDB/logger.service.js"

export const toyController = {
    getToys,
    getToyById,
    removeToy,
    updateToy,
    addToy,
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

async function getToyById(req, res) {
    try {
        const { toyId } = req.params
        const toy = await toyService.getById(toyId)
        res.send(toy)
    } catch (error) {
        loggerService.error('Cannot get toy', error)
        res.status(500).send(error)
    }
}

async function removeToy(req, res) {
    try {
        const { toyId } = req.params
        await toyService.remove(toyId)
        res.send('Toy removed')
    } catch (err) {
        loggerService.error(`Failed to remove toy ${toyId}`, err)
        res.status(500).send('Failed to remove toy', err)
    }
}

async function addToy(req, res) {
    const toy = req.body
    try {
        const savedToy = await toyService.add(toy)
        res.send(savedToy)
    } catch (err) {
        loggerService.error('Failed to add toy', err)
        res.status(500).send('Failed to add toy')
    }
}

async function updateToy(req, res) {
    const toy = req.body
    // console.log('Toy id ',toy,_id)
    // console.log('Params',req.params)
    try {
        const updatedToy = await toyService.update(toy)
        res.send(updatedToy)
    } catch (err) {
        loggerService.error('Failed to update toy', err)
        res.status(500).send('Failed to update toy')
    }
}
