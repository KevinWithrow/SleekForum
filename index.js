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

app.param('threadUUID', function (req, res, nextFn, threadUUID) {
  db.getThread(threadUUID)
    .then((thePost) => {
      req.sleekfourmdb = req.sleekfourmdb || {}
      req.sleekfourmdb.thePost = thePost
      nextFn()
    })
    .catch(() => {
      res.status(404).send('Post not found')
    })
})

// the homepage shows your threads
app.get('/', function (req, res) {
  // res.render('index', { title: 'Hey', message: 'Hello there!' })
  db.getThreads()
    .then((threadArray) => {
      res.render('index', { threadArray: threadArray })
    })
    .catch(() => {
      res.status(500).send('oops my bad!')
    })
})





//the page shows posts of the thread
app.get('/thread/:threadUUID', function (req, res) {
  // db.getThread()
  // .then(console.log("getPost is working"))
  console.log("Thread get endpoint")
  console.log(req.sleekfourmdb)
  res.send("debugging")

  // const theList = sleekfourmdb.post
  // if (userExists(req.params.userUUID)){
  //   res.render('index', { listname: 'Dummy Users', items: dummyItems})
  // } else {
    
  }

)

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
 
