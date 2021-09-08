// Update with your config settings.
const knex = require("knex");
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: __dirname + "/migrations"  
  },
  searchPath: "public",
});

module.exports = db
