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
const createmember = () => ({
  display_name: faker.name.firstName(),
  muuid: faker.random.uuid(),
  avatar: faker.image.avatar(),
})
//Function that will create a list of threads
const createThread = () => ({
  uuid: faker.random.uuid(),
})
//Function that will create post in each  thread
const createPost = (integer, sentences, membername, memberid, memberav, thread, getDate) => ({
  id: integer,
  uuid: faker.random.uuid(),
  post_content: faker.lorem.sentences(sentences),
  display_name: membername,
  member_id: memberid,
  avatar: memberav,
  thread_id: thread,
  ctime: getDate,
})

//#endregion
let newtime
let oldtime = 0

function getDate (i) {
  if(i === 0){
    newtime = faker.date.between("2020-03-28","2020-04-28")
  } else {
    newtime = IncrementDate(oldtime)
  }
  oldtime = newtime
  return newtime
}

function IncrementDate(date) {         
  var tempDate = new Date(date);
     tempDate.setDate(tempDate.getDate() + 1);
     return tempDate;
} 

//#region  Loop operations
//loop that will insert a new member for the member array, length 50
for(let i = 0; i < 50; i++){
  fakemembers.push(createmember())
}

//nested forloop that will create a thread and randomize the number of post within the thread
for(let i = 0; i < 6; i++){
  // Randomizes the number of post in a thread iwth a max of 30
  let numberOfPost = faker.random.number(30)
  // Randomizes the original poster of the thread
  let thismember = faker.random.number(50)
  let memID
  // 
  fakeThreads.push(createThread())
  
  // Randomizer loop that will make sure no there are not two posted in a row
  for(let j = 0; j < numberOfPost; j++){
    //Randomizes the number of sentences each post will have
    let numberOfSentences = faker.random.number(7) + 1
    //Serialize the post number
    let p = fakePost.length

    
    if(j===0){
      memID = thismember
    }else{
      memID = Math.floor(Math.random() * 49)
      while(memID === fakePost[(j-1)].member_id){
        memID = Math.floor(Math.random() * 49)
      }
    }
    // Puts the new created post at the bottom of the post array
    fakePost.push(createPost(p,numberOfSentences, fakemembers[memID].display_name, fakemembers[memID].muuid, fakemembers[memID].avatar, fakeThreads[i].uuid, getDate(j)))
  }
}
//#endregion

//#region Seed Function
//Function that runs when the seeding is called that removes previous data and imports the new data
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      return knex('post').insert(fakePost)
    })
};
//#endregion