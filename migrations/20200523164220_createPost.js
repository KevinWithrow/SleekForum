const createPostTable = `
create table post (
  id integer primary key,
  uuid text,
  display_name text,
  avatar text,
  member_id text,
  thread_id text,
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