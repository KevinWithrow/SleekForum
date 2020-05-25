//#region Imports
//import fakerjs for random generation
const faker = require('faker')
//#endregion

//#region Constants
//array of members to be imported
const fakemembers = []
//array of threads to be imported
const fakeThreads = []
//array of the post to be imported on each thread
const fakePost = []
//#endregion

//#region Create Operations
//Function that will create a member(id, display_name, UUID)
const createmember = (integer) => ({
  id: integer,
  display_name: faker.name.firstName(),
  uuid: faker.random.uuid(),
})
//Function that will create a list of threads
const createThread = (integer) => ({
  id: integer,
  uuid: faker.random.uuid(),
  title: faker.lorem.sentence(),
  member_id: Math.floor(Math.random() * 50),
})
//Function that will create post in each  thread
const createPost = (integer, sentences, member, thread) => ({
  id: integer,
  uuid: faker.random.uuid(),
  post_content: faker.lorem.sentences(sentences),
  member_id: member,
  thread_id: thread,
})
//#endregion

//#region  Loop operations
//loop that will insert a new member for the member array, length 50
for(let i = 0; i < 50; i++){
  fakemembers.push(createmember(i))
}

//nested forloop that will create a thread and randomize the number of post within the thread
for(let i = 0; i < 30; i++){
  // Randomizes the number of post in a thread iwth a max of 30
  let numberOfPost = faker.random.number(30)
  // Randomizes the original poster of the thread
  let thismember = faker.random.number(50)
  // 
  fakeThreads.push(createThread(i, thismember, numberOfPost))
  
  // Randomizer loop that will make sure no there are not two posted in a row
  for(let j = 0; j < numberOfPost; j++){
    //Randomizes the number of sentences each post will have
    let numberOfSentences = faker.random.number(4) + 1
    //Serialize the post number
    let p = fakePost.length

    let memID
    if(j===0){
      memID = Math.floor(Math.random() * 49)
    }else{
      memID = Math.floor(Math.random() * 49)
      while(memID === fakePost[(j-1)].member_id){
        memID = Math.floor(Math.random() * 49)
      }
    }
    // Puts the new created post at the bottom of the post array
    fakePost.push(createPost(p,numberOfSentences, memID, i))
  }
}
//#endregion

//#region Seed Function
//Function that runs when the seeding is called that removes previous data and imports the new data
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function (){
      return knex('thread').del()
    })
    .then(function (){
      return knex('member').del()
    })

    // Inserts the new arrays into the tables
    .then(function () {
      return knex('member').insert(fakemembers)
    })
    .then(function () {
      return knex('thread').insert(fakeThreads)
    })
    .then(function () {
      return knex('post').insert(fakePost)
    })
};
//#endregion