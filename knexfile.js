// Update with your config settings.

module.exports = {


  development: {
    client: 'postgresql',
    connection: {
      database: 'stayconnected',
      user:     'postgres',
      password: 'postgres'
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
