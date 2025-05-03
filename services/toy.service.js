import fs from 'fs'
import { utilService } from './util.service.js'


const toys = utilService.readJsonFile('data/toy.json')
const labels = [
    'On wheels', 'Box game', 'Art', 'Baby',
    'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'
]
export const toyService = {
    query,
    getById,
    remove,
    save
}


function query(filterBy = {}) {
    console.log(filterBy)
    let filteredToys = toys
    // return Promise.resolve(toys)
    // .then(toys => {
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.inStock !== undefined) {
        filteredToys = filteredToys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
    }
    if (filterBy.labels?.length) {
        filteredToys = filteredToys.filter(toy =>
            filterBy.labels.every(label => toy.labels.includes(label))
        )
    }
    return  Promise.resolve(filteredToys)
    // })
}

function getById(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Cannot find toy: ' + toyId)
    return Promise.resolve(toy)
}

function save(toy) {
    if (toy._id) {
        // UPDATE
        const toyIdx = toys.findIndex(toy => toy._id === toy._id)
        if (toyIdx === -1) return Promise.reject(`Toy id ${toy._id} not found`)
        toy.updatedAt = Date.now()
        toys[toyIdx] = { ...toys[toyIdx], ...toy }
    } else {
        // ADD
        toy._id = utilService.makeId()
        toy.createdAt = Date.now()
        toy.inStock = true
        toys.unshift(toy)

    }

    return _saveToysToFile()
        .then(() => toy)
}

function remove(toyId) {
    const toyIdx = toys.findIndex(toy => toy._id === toyId)
    if (toyIdx === -1) return Promise.reject('Cannot remove toy: ' + toyId)

    toys.splice(toyIdx, 1)
    return _saveToysToFile().then(() => toyId)
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(toys, null, 4)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

