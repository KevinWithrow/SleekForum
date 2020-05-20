const express = require('express')
const db = require('./library/db')

const app = express()

//serve files out of the public directory
app.use(express.static('public'))

const port = 7878

//set the template engine
app.set('view engine', 'hbs');

const dummyLists = [
  {
    uuid: 'adfhhkkkkhgh',
    name: 'Kevin'
  },
  {
    uuid: 'lhgkfgjfk',
    name: 'Howie'
  }
]

const dummyItems = [
  {
    uuid: 'adfhhkkkkhgh',
    description: 'can I pet that dog!',
    display_order: 1
  },
  {
    uuid: 'lhgkfgjfk',
    description: 'wash the car',
    display_order: 2
  }
]

app.param('listUUID', function (rec, res, nextFn, listUUID) {
  db.getList(listUUID)
  .then((theList) => {
    console.log(theList)
    console.log('8888888888888888888')
    req.list = theList
    nextFn()
  })
    .catch(() => {
      res.status(404).send('list not found')
    })
  console.log(listUUID)
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  console.log('CALLED ONLY ONCE')
  next()
})

// the homepage shows your lists
app.get('/', function (req, res) {
  db.getLists()
  .then((lists) => {
    res.render('index', { lists: lists})
  })
  .catch(() => {
    //TODO: show and error page here
  })
 
})

//the list page shows the items in the list
app.get('/list/:listUUID', function (req, res) {
  res.render('list_page', { listname: 'Dummy List', items: dummyItems})
})

const startExpressApp = () => {
  app.listen(port, () => {
    console.log('express is listening on port ' + port)
    })      
}

const bootupSequenceFailed = (err) => {
  console.error('You are unable to connect to the database:', err)
  console.error('Goodbye!')
  process.exit(1)
}
//global kickoff point

db.connect()
  .then(startExpressApp)
  // .then(testSomething)
  .catch(bootupSequenceFailed)
  
  
// function testSomething (){
//   db.getLists()
//   .then((lists) => {
//     console.log("the lists")
//     console.log(lists)
//   })
// }
 
