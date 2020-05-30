const express = require('express')
const db = require('./library/db')

const app = express()

//serve files out of the public directory
app.use(express.static('public'))

const port = 7878

//set the template engine
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
  db.getThisThread(req.params.threadUUID)
    .then((postArray) => {
      res.render('thread', {
        postArray: postArray,
        title: postArray[0].title
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

app.post('/:threadUUID/newthread', function (req, res) {
  const newThreadTitle = req.body.title
  const newThreadContent = req.body.newThreadContent
  const newThreadMember = req.body.member

  console.log(newThreadTitle)
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