const createThreadTable = `
create table thread (
    id integer primary key,
    uuid text,
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
