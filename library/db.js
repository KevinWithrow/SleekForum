const knexLib = require('knex')
const dbCfg = require('../knexfile')
const faker = require('faker')

//this will hold our database connection
let conn = null

function uuid() {
    const uuid = faker.random.uuid()
    return uuid
}

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
const getThreadQuery = `select distinct (thread_id) from post;`

const threads = []
let source = false
const threadArray = (uuid) => ({
    title: faker.lorem.sentence(),
    thread_id: uuid,
    avatar: faker.image.city(),
    content: faker.lorem.sentences(faker.random.number(5)+1)
  })


//Returns all threads from promise
function getThreads () {
    return conn.raw(getThreadQuery)
    .then((result) => {
        if(source === false){
            result.rows.forEach(element => {
                threads.push(threadArray(element.thread_id))
            })

            for(let i = 0; i < threads.length; i++){
                switch(i){
                    case 0: threads[i].avatar = faker.image.city(); break;
                    case 1: threads[i].avatar = faker.image.food(); break;
                    case 2: threads[i].avatar = faker.image.sports(); break;
                    case 3: threads[i].avatar = faker.image.nightlife(); break;
                    case 4: threads[i].avatar = faker.image.abstract(); break;
                    case 5: threads[i].avatar = faker.image.animals(); break;
                }
            }
            source = true;
            return threads
        } else{
            return threads
        }
        
    }) 
    .catch((err) => {
        console.log(err)
    })
}

const getPostQuery = `SELECT * FROM post WHERE thread_id = ? order by id`

function getThread (threadID) {
    return conn.raw(getPostQuery, [threadID])
    .then((result) => {
        return result.rows[0]
    }) 
}

function getThisThread (uuid) {
    return conn.raw(getPostQuery, [uuid])
    .then((result) => {
        return result.rows
    })
    .catch((err) => {
        console.log(err)
    })
}

const getrows = `SELECT COUNT(*) FROM post;`

const createNameQuery = `insert into post (id, uuid, member_id, thread_id, post_content, display_name, avatar, ctime, mtime)
values (?, ?, ?, ?, ?, 'Mod', 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/MOD_Pizza_logo.svg/1200px-MOD_Pizza_logo.svg.png', current_timestamp,current_timestamp);`
function createPost (threaduuid, post_content) {
    let june = threaduuid
    let july = post_content
    return conn.raw(getrows)
        .then((result) => {
            return result.rows[0].count
        })
        .then((result) => {
            conn.raw(createNameQuery, [result+1, uuid(), 99, june, july])
            .then((result) => {
                return result.rows
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

const getThready = `select thread_id from post where uuid = ?;`
const deleteQuery = `delete from post where uuid = ?;`
function deleteThis (uuid) {
    let ogthread
    return conn.raw(getThready, [uuid])
        .then((result) => {
            ogthread = result.rows[0].thread_id
            return result.rows[0].thread_id
        })
        .then((result) => {
            conn.raw(deleteQuery, [uuid])
            return keepDelete(result, uuid)
        })
        .catch((err) => {
            console.log('Deletion Failure')
            console.log(err)
        })
}

function keepDelete (oguuid, uuid) {
    return conn.raw(deleteQuery, [uuid])
        .then(() => {
            console.log('Deletion Successful')
            return oguuid
        })
        .catch((err)=>{
            console.log(err)
        })
}

const getContentQuery = `select post_content from post where uuid = ?;`
const updateThisQuery = `update post set post_content = ? where uuid = ?;`
function updatePost (uuid) {
    let muuid = uuid
    let oguuid
    let newMessage = '\n\n\n\nYou have been giving a warning further violations could result in a ban.'
    return conn.raw(getContentQuery, [uuid])
        .then((result) => {
            return newMessage = result.rows[0].post_content+newMessage
        })
        .then(() => {
            oguuid = getUUID(muuid)
            return oguuid
        })
        .then(() => {
            updateThis(newMessage, muuid)
            return oguuid
        })
        .catch((err)=>{
            console.log(err)
        })
}

function getUUID (uuid) {
    return conn.raw(getThready, [uuid])
        .then((result) => {
            return result.rows[0]
        })
}

function updateThis (newPost, uuid) {
    return conn.raw(updateThisQuery, [newPost, uuid])
        .then(() => {
            return uuid
        })
        .catch((err)=>{
            console.log(err)
        })
}


module.exports = {
    connect: connect,
    getThreads: getThreads,
    getThread: getThread,
    getThisThread: getThisThread,
    createPost: createPost,
    deleteThis: deleteThis,
    updatePost: updatePost
}