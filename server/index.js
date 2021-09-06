const express = require("express");
const app = express();

const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  migrations:{
    tableName: 'migrations'
  }
})


app.get("/hello", (req, res) => {
  res.send("hello world");
})



const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});