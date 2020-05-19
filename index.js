const express = require('express')

const app = express()

//serve files out of the public directory
app.use(express.static('public'))

const port = 9999

app.set('view engine', 'hbs')

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(port, () => {
    console.log('express is listening on port ' + port)
})