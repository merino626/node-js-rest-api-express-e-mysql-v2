const query = require('../database/db/queries')

class consult{
    add(consult){
        const sqlAdd = `INSERT INTO Petcare SET ?`
        return query(sqlAdd, consult)
    }

    retrieve(){
        const sqlGetAll = `select * from petcare`
        return query(sqlGetAll)
    }


    retrieve_one(id){
        const sqlGetAll = `select * from petcare where id = ?`
        return query(sqlGetAll, id)
    }

    change(data, id){
        const sqlChange = `UPDATE petcare set ? where id = ?`
        return query(sqlChange, [data, id])
    }

    delete(id){
        const sqlDelete = `DELETE FROM petcare WHERE id = ?`
        return query(sqlDelete, id)
    }

}

module.exports = new consult