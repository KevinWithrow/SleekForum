//
const express = require('express')
const db = require('./lib/db')

const app = express()
const port = 7878

//need templating code

//need CRUD request
/*app.get('/', function (req, res){

})*/

/*app.post('/', function (req, res){

})*/



//app start up and boot fail
const startExpressApp = () => {
    app.listen(port, () => {
      console.log('express is listening on port ' + port)
    })
}

const bootupSequenceFailed = (err) => {
    console.error('Unable to connect to the database:', err)
    console.error('Goodbye!')
    process.exit(1)
}

db.connect()
    .then(startExpressApp)
    .catch(bootupSequenceFailed)