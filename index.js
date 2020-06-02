const express = require('express')
const db = require('./library/db')

const app = express()

//serve files out of the public directory
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const port = 7878

//set the template engine
app.set('view engine', 'hbs')

// the homepage shows your threads
app.get('/', function (req, res) {
  db.getThreads()
    .then((threadUUID) => {
      res.render('index', { 
        threadUUID: threadUUID,
       })
    })
    .catch(() => {
      res.status(500).send('oops my bad!')
    })
})

//the page shows posts of the thread
app.get('/thread/:threadUUID', function (req, res) {
  const muuid = req.params.threadUUID
  db.getThisThread(req.params.threadUUID)
    .then((postArray) => {
      res.render('thread', {
        postArray: postArray,
        muuid: muuid,
      })
    })
    .catch(() => {
      res.status(404).send('Thread not found')
    })
  
})

//the page shows posts of the thread
app.get('/member/:memberUUID', function (req, res) {
  db.getThisThread(req.params.memberUUID)
    .then((memberPost) => {
      console.log(memberPost[0].display_name)
      res.render('member', {
        memberPost: memberPost,
        avatar: memberPost[0].avatar,
        display_name: memberPost[0].display_name
      })
    })
    .catch(() => {
      res.status(404).send('Member not found')
    })
  
})

app.post('/thread/:threadUUID/added', function (req, res) {
  const muuid = req.params.threadUUID
  db.createPost(muuid, req.body.content)
    .then(function () {
      res.render('added', {uuid: muuid})
    })
    .catch(() => {
      res.status(404).send('Iono fam')
    })
})

app.get('/thread/:uuid/deleted', function (req, res) {
  let deleteuuid = req.params.uuid
  db.deleteThis(deleteuuid)
    .then((result) => {
      res.render('deleted',{
        result: result
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(404).send('Delete no go?')
    })
})

app.get('/thread/:uuid/modify', function (req, res) {
  db.updatePost(req.params.uuid)
    .then(function (result) {
      let hype = result.thread_id
      res.render('modify', {
        hype: hype
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(404).send('Modify no worky')
    })
})

//#region Kick Off Functions
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
  .catch(bootupSequenceFailed)