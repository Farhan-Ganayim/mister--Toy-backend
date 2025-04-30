import fs from 'fs'
import { utilService } from './util.service.js'


const toys = utilService.readJsonFile('data/toy.json')

export const toyService = {
    query,
}


function query() {
    return Promise.resolve(toys)
        .then(toys => {
            // if (filterBy)
            return toys
        })

}
