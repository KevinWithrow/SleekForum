const knexLib = require('knex')
const dbCfg = require('../knexfile')

//this will hold our database connection
let conn = null

//this should return a promise
function connect () {
    return new Promise(function (resolve, reject) {
       conn = knexLib(dbCfg.development)
        conn.raw(`SELECT 1 + 1 AS test`)
        .then((result) => {
            console.log(result.rows)
            if (result.rows.length === 1 && result.rows[0].test === 2) {
                console.log("Database connection established 👍")
                resolve()
            } else {
                reject('Database was unable to do 1 + 1 👎')
            }
            console.log(xxxxxxxxxxx)

        })
        .catch((err) => {
            reject(err)
        })      
    })
}

//Grab All Threads SQL Query
const getThreadQuery = `SELECT * FROM thread`

function confirmExistence (uuid) {
    return conn.raw(getPostQuery,[uuid])
    .then((result) => {
        const match = result.rows
        const threadMatches = match.filter(function(thread){
            return thread.uuid = uuid
        })
        return threadMatches >= 1
    })
}

//Returns all threads from promise
function getThreads () {
    return conn.raw(getThreadQuery)
    .then((result) => {
        return result.rows
    }) 
}

const getPostQuery = `SELECT * FROM thread WHERE uuid = ?`

function getThread (threadID) {
    return conn.raw(getPostQuery, [threadID])
    .then((result) => {
        return result.rows[0]
    }) 
}

const getThisThreadQuery = `select p.post_content, p.member_id, p.thread_id, m.display_name, t.title, t.uuid
from post as p
left join member as m
on p.member_id = m.id
left join thread as t
on p.thread_id = t.id
where t.uuid = ?;`

function getThisThread (uuid) {
    return conn.raw(getThisThreadQuery, [uuid])
    .then((result) => {
        return result.rows
    }) 
}

//#region Create Tools

const getLastMember = `    SELECT id FROM member
                        ORDER BY id DESC
                        LIMIT 1;`                        

const getLastThread = `
                        SELECT id FROM thread
                        ORDER BY id DESC
                        LIMIT 1;`

const getLastPost = `
                        SELECT id FROM post
                        ORDER BY id DESC
                        LIMIT 1;`

function getLastItem (last) {
    return conn.raw(last)
    .then((result) => {
        return result.rows[0]
    })
}


const createMemberQuery = `INSERT INTO member (id, uuid, display_name, ctime, mtime)
values (?, ?, ?, current_timestamp, current_timestamp)`

function createMember (display_name) {
      return conn.raw(createMemberQuery, [getLastItem(getLastMember), uuid(), display_name])
    .then((result) => {
      return result.rows[0]
    })
}

const createThreadQuery = `INSERT INTO thread (id, uuid, member_id, title, ctime, mtime)
values (?, ?, ?, ?, current_timestamp, current_timestamp)`

function createThread (member_id, title) {
      return conn.raw(createThreadQuery, [getLastItem(getLastThread), uuid(), member_id, title])
    .then((result) => {
      return result.rows[0]
    })
}

const createPostQuery = `INSERT INTO post (id, uuid, member_id, thread_id, post_content, ctime, mtime)
values (?, ?, ?, ?, ?, current_timestamp, current_timestamp)`

function createPost (member_id, thread_id, post_content) {
      return conn.raw(createPostQuery, [getLastItem(getLastPost), uuid(), member_id, thread_id, post_content])
    .then((result) => {
      return result.rows[0]
    })
}
//#endregion 

//---------------------------------------
// Public API

module.exports = {
    connect: connect,
    getThreads: getThreads,
    getThread: getThread,
    getThisThread: getThisThread,
    createMember: createMember,
    createThread: createThread,
    createPost: createPost,
}