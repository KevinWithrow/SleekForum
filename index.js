const express = require('express')
const db = require('./library/db')

const app = express()

//serve files out of the public directory
app.use(express.static('public'))

const port = 7878

//set the template engine
app.set('view engine', 'hbs');

const dummyUsers = [
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

app.set('view engine', 'hbs')

app.param('listUUID', function (req, res, nextFn, listUUID) {
  db.getList(listUUID)
    .then((theList) => {
      req.sleekfourmdb = req.sleekfourmdb || {}
      req.sleekfourmdb.list = theList
      nextFn()
    })
    .catch(() => {
      res.status(404).send('list not found')
    })
})

// the homepage shows your lists
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
  // db.getLists()
    // .then((lists) => {
    //   res.render('index', { lists: lists })
    // })
    // .catch(() => {
    //   // TODO: show an error page here
    // })
})


//the list page shows the items in the list
app.get('/user/:userUUID', function (req, res) {
  // const theList = sleekfourmdb.post
  if (userExists(req.params.userUUID)){
    res.render('index', { listname: 'Dummy Users', items: dummyItems})
  } else {
    res.status(404).send('user not found')
  }

})

function userExists (userUUID){
 const userMatches = dummyUsers.filter(function(user){
   return user.uuid === userUUID
 }) 
 return userMatches.length >= 1
}

app.get('/thread:threadUUID', function (req, res) {
  // const theList = sleekfourmdb.post
  if (threadExists(req.params.threadUUID)){
    res.render('index', { listname: 'Dummy Users', items: dummyItems})
  } else {
    res.status(404).send('thread not found')
  }

})

function threadExists (threadUUID){
 const threadMatches = dummyThread.filter(function(thread){
   return thread.uuid === threadUUID
 }) 
 return threadMatches.length >= 1
}

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
 
