const consult = require('../models/consults')


module.exports = app => {
    app.get('/consulta', (req, res) => {
        consult.retrieve()
            .then(results => res.status(200).json(results))
            .catch(err => res.status(400).json(err))
    })  

    app.get('/consultabyid/:id', (req, res) => {
        consult.retrieve_one(req)
            .then(results => res.status(200).json(results))
            .catch(err => res.status(400).json({err}))
    })

    app.post('/consulta', (req, res) => {
        
        consult.add(req.body)
            .then(
                consult => {
                    res.status(200).json(consult)
                }
            )
            .catch(err => {
                res.status(400).json(err)
            })
    })

    app.patch('/alterarconsulta/:id', (req, res) => {
        consult.change(req)
            .then((result) => res.status(200).json(result))
            .catch(err => res.status(400).json(err))
    })


    app.delete('/deleteconsulta/:id', (req, res) => {
        consult.delete(req)
            .then(results => res.status(200).json(results))
            .catch(err => res.status(400).json(err))
    })
}

