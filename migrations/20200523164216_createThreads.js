const createThreadTable = `
create table thread (
    id serial primary key,
    uuid text unique,
    member_id integer references member(id),
    title text unique,
    ctime timestamptz,
    mtime timestamptz default current_timestamp
);`

const dropThreadTable = `DROP TABLE thread;`

exports.up = function(knex) {
  return knex.raw(createThreadTable)
};

exports.down = function(knex) {
  return knex.raw(dropThreadTable)
};
