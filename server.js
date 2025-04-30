import express from 'express'
import { loggerService } from './services/logger.service.js'
import { toyService } from './services/toy.service.js'



const app = express()
app.use(express.json())

app.get('/api/toy', (req, res) => {
    toyService.query()
        .then(toys => res.send(toys))
        .catch(err => {
            loggerService.error('Cannot load toys', err)
            res.status(400).send('Cannot load toys')
        })
})

app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.getById(toyId)
        .then(toy => res.send(toy))
        .catch(err => {
            loggerService.error('Cannot get toy', err)
            res.status(400).send(err)
        })
})

//ADD
app.post('/api/toy', (req, res) => {
    const toyToSave = {
        name: req.body.name,
        price: +req.body.price,
        labels: req.body.labels,
    }

    toyService.save(toyToSave)
        .then(savedToy => res.send(savedToy))
        .catch(err => {
            loggerService.error('Cannot add toy', err)
            res.status(400).send('Cannot add toy')
        })
})

//EDIT

app.put('/api/toy/:toyId', (req, res) => {
    const { name, price, _id, labels, inStock } = req.body
    const toyToSave = {
        _id,
        name,
        price: +price,
        labels,
        inStock
    }
    toyService.save(toyToSave)
        .then(savedToy => res.send(savedToy))
        .catch(err => {
            loggerService.error(`Cannot update toy ${toyToSave._id}`, err)
            res.status(400).send('Cannot update toy')
        })
})

app.delete('/api/toy/:toyId', (req, res) => {

    const { toyId } = req.params
    console.log('Deleted: ', toyId)
    toyService.remove(toyId)
        .then(() => res.send('Toy removed'))
        .catch(err => {
            loggerService.error('Cannot remove toy', err)
            res.status(400).send('Cannot remove toy')
        })
})


const port = process.env.PORT || 3030
app.listen(port, () => {
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
})
