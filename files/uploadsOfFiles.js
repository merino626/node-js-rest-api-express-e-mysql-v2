const fs = require('fs')
const pathModule = require('path')

// Esta função faz a stream de dados diferentemente do readFile que é muito pesado
// e trava a execução

module.exports = (path, nomeArquivo, callbackImagemCriada) => { 
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = pathModule.extname(path)
    const tipoEhValido = tiposValidos.indexOf(tipo.replace('.','')) !== -1

    if (!tipoEhValido){
        const erro = 'O tipo de arquivo submetido é inválido'
        console.log('Erro, tipo invalido')
        callbackImagemCriada(erro)
    }
    else{
        const newPath = `./assets/imagens/${nomeArquivo}${tipo}`

        fs.createReadStream(path)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => callbackImagemCriada(false, newPath))
    }
    
}