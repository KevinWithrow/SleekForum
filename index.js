//
const express = require('express')

const app = express()

//serve files out of the public directory
app.use(express.static('public'))

const port = 9999

app.set('view engine', 'hbs')

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

//const db = require('./lib/db')


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
startExpressApp()
// const bootupSequenceFailed = (err) => {
//     console.error('Unable to connect to the database:', err)
//     console.error('Goodbye!')
//     process.exit(1)
// }

// db.connect()
//     .then(startExpressApp)
//     .catch(bootupSequenceFailed)
