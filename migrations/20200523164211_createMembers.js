const createMemberTable = `
create table member (
    id serial primary key,
    uuid text,
    display_name text,
    ctime timestamptz,
    mtime timestamptz default current_timestamp
);`

const dropMemberTable = `DROP TABLE "member";`

exports.up = function(knex, Promise) {
    return knex.raw(createMemberTable)
};

exports.down = function(knex, Promise) {
  return knex.raw(dropMemberTable)
};
