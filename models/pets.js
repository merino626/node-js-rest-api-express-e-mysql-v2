const conection = require('../database/db/connection')
const uploadDeArquivo = require('../files/uploadsOfFiles')


class Pet{
    add(pet, res){
        console.log(pet)
        const sqlAddPet = `INSERT INTO pet SET ?`

        uploadDeArquivo(pet.image, pet.name,(erro, newPath) => {
            if (erro) {
                res.status(400).json({message:erro})
            }
            else{
                const novoPet = {name:pet.name, image:newPath}

                conection.query(sqlAddPet, novoPet, err => {
                    if (err) {
                        res.status(400).json({err: err})
                    }
                    else {
                        res.status(200).json({created:pet})
                    }
                })
            }
            
        })

        
    }
}


module.exports = new Pet