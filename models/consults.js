const conexao = require('../database/db/connection')
const validators = require('../validators/checkers')
const moment = require('moment')
const axios = require('axios')
const repositorio = require('../repositorios/consults')


class PetCare {
    add(consultRequest) {
        let isInvalid = validators.validateConsultPost(consultRequest)
        let responseObj

        if (isInvalid) {
            responseObj = {
                status: 400,
                message: 'Unprocessable Entity, Invalid request.'
            }
            return new Promise(reject =>{
                reject(responseObj)
            })
        }
        else {
            consultRequest.consult_date = moment(consultRequest.consult_date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

            return repositorio.add(consultRequest)
                .then((results) => {
                    return {
                        created: consultRequest,
                        message: 'Consult successfully created'
                    }
                })
        }

        
    }

    retrieve(){
        return repositorio.retrieve()
                .then((results) => {
                    if (results.length === 0) {
                        return new Promise(reject =>{
                            reject({msg: 'No results found'})
                        })
                    }
                    return results
                })
    }
    
    retrieve_one(consult){
        //Essa query abaixo é a query que fará você sofrer SQL INJECTION - EVITE-A
        // se eu fizer uma requisição igual a http://localhost:8181/consultabyid/1111 or id >= 1
        // Você acaba de tomar uma injeção de sql.
        //const sqlGetAll2 = `select * from petcare where id = ${req.params.id}`

        return repositorio.retrieve_one(consult.params.id)
                .then(async results =>{
                    if (results.length === 0){
                        return new Promise(reject =>{
                            reject({msg:'Not found'})
                        })
                    }

                    let resultados = results[0]
                    const {data} = await axios("https://random-data-api.com/api/users/random_user")
                    resultados.firts_name = data.first_name
                    resultados.address = data.address
                    return {results:resultados}
                })
    }


    change(req) {
        if (req.body.consult_date){
            req.body.consult_date = moment(req.body.consult_date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        return repositorio.change(req.body, req.params.id)
                .then(results => {
                    if(results.affectedRows === 0){
                        return new Promise(reject =>{
                            reject({msg:'Consulta inexistente'})
                        })
                    }
                    return {changed: req.body, info: results}
                })
    }


    delete(req){
        return repositorio.delete(req.params.id)
                .then(results => {
                    if (results.affectedRows === 0){
                        return new Promise(reject =>{
                            reject({msg:'Not found'})
                        })
                    }

                    return {deleted:req.params.id, info:results}
                })
    }
}

module.exports = new PetCare