// Update with your config settings.
require('dotenv').config();
console.log(process.env.PG_CONNECTION_STRING)

module.exports = {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: '/migrations'
    }
};
