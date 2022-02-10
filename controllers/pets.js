const pets = require('../models/pets')


module.exports = app => {
    app.post('/pet', (req, res) => {
        pets.add(req.body, res)
    })
}