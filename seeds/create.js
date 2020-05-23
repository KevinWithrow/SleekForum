const faker = require('faker')

const createmember = (integer) => ({
  id: integer,
  display_name: faker.name.firstName(),
  uuid: faker.random.uuid(),
})

const createThread = (integer, memberArray, threadLength) => ({
  id: integer,
  uuid: faker.random.uuid(),
  title: faker.lorem.sentence(),
  member_id: Math.floor(Math.random() * 50),
  post_count: threadLength
})

const createPost = (integer, sentences, member, thread) => ({
    id: integer,
    uuid: faker.random.uuid(),
    post_content: faker.lorem.sentences(sentences),
    member_id: member,
    thread_id: thread,
})

exports.seed = async function (knex, Promise){
  const fakemembers = []
  const numberOfFakers = 50
  const fakeThreads = []
  const numberOfThreads = 50
  const fakePost = []

  for(let i = 0; i < numberOfFakers; i++){
    let byron = createmember(i)
    fakemembers.push(byron)
  }

  for(let i = 0; i < numberOfThreads; i++){
    let numberOfPost = Math.floor(Math.random() * 46)
    let numberOfSentences = Math.floor(Math.random() * 5) + 1
    let thismember = Math.floor(Math.random() * 49)
    let newThread = createThread(i, thismember, numberOfPost)
    fakeThreads.push(newThread)

    for(let j = 0; j < numberOfPost; j++){
      let p = fakePost.length
      fakePost.push(createPost(p,numberOfSentences, thismember, i))
    }
  }

  await knex('member')
    .insert(fakemembers)
  await knex('thread')
    .insert(fakeThreads)
  await knex('post')
    .insert(fakePost)
}