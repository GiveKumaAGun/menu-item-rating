// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:reiji2924@localhost/menu_notes',
    migrations: {
      tableName: '/migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: ',/db/knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './db/knex_migrations'
    }
  }

};
