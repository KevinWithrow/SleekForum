const knexLib = require('knex')
const dbCfg = require('../knexfile')

let conn = null

function connect () {
    return new Promise(function (resolve, request){
        conn = knexLib(dbCfg.development)
        conn.raw(`SELECT 1 + 1`)
            .then((result) => {
                console.log('Database connection sucess')
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    connect: this.connect
}