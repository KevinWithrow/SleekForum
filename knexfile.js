// Update with your config settings.

module.exports = {


  development: {
    client: 'postgresql',
    connection: {
      database: 'sleekforumdb',
      user:     'kevinwithrow',
      password: '123jordan'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

  
};
