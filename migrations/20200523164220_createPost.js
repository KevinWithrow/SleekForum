const createPostTable = `
create table post (
  id serial primary key,
  uuid text unique,
  member_id integer references member(id),
  thread_id integer references thread(id),
  post_content text,
  ctime timestamptz,
  mtime timestamptz default current_timestamp
);`

const dropPostTable = `DROP TABLE "post";`


exports.up = function(knex) {
  return knex.raw(createPostTable)
};

exports.down = function(knex) {
  return knex.raw(dropPostTable)
};