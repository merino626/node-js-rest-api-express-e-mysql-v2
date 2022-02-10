const conection = require('./connection')

const executaQuery = (query, params=false) => {
    return new Promise((resolve, reject) => {
            conection.query(query, params, (err, results, fields) => {
                if (err) {
                    reject(err)
                }
                else{
                    resolve(results)
                }
            })
    })  
}

module.exports = executaQuery