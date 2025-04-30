import express from 'express'
import { loggerService } from './services/logger.service.js'
import { toyService } from './services/toy.service.js'



const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send('hello farhan!!!')
})

app.get('/api/toy', (req, res) => {
    toyService.query()
        .then(toys => res.send(toys))
        .catch(err => {
            loggerService.error('Cannot load toys', err)
            res.status(400).send('Cannot load toys')
        })

})


const port = process.env.PORT || 3030
app.listen(port, () => {
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
})
