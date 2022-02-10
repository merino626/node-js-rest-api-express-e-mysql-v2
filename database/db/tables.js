class Tables{
    init(conection){
        this.conection = conection
        this.createPetCare()
        this.createPet()
    }

    createPetCare(){
        const sqlCreateTable = 
            `CREATE TABLE IF NOT EXISTS Petcare
                (
                id int NOT NULL AUTO_INCREMENT,
                customer varchar(11) NOT NULL,
                pet varchar(20) NOT NULL,
                service varchar(20) NOT NULL,
                consult_status varchar(20) NOT NULL,
                observations text,
                consult_date datetime NOT NULL,
                date_created datetime DEFAULT NOW(), 
                PRIMARY KEY(id)
                )`

        this.conection.query(sqlCreateTable, err => {
            if (err) {
                err ? 
                    console.log('Table petcare already exists') :
                    console.log(err)
            } else {
                console.log('Table petcare created successfully!')
            }
        })
    }

    createPet(){
        const sqlCreateTablePet = 
            `CREATE TABLE IF NOT EXISTS Pet 
                (
                id int NOT NULL AUTO_INCREMENT,
                name varchar(60) NOT NULL,
                image varchar(200),
                PRIMARY KEY(id)
                )`

        this.conection.query(sqlCreateTablePet, err =>{
            if (err){
                console.log('table pet already exists')
                console.log(err)
            }
            else{
                console.log('Table pet created successfully!')
            }
        })
    }
}   


module.exports = new Tables