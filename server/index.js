const connection = require('../knexfile')
const db = require('knex')(connection) 

require('dotenv').config();

const express = require("express");
const path = require("path")


const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api/users/:username/", async (req, res) => {
  console.log("hello")
  let data = await db.select().from("dish_reviews").fullOuterJoin("dishes", "dish_reviews.dish_id", "dishes.id").fullOuterJoin("restaurants", "dishes.restaurant_id", "restaurants.id").where({username: req.params.username})
  res.json(data);
})

app.get("/api/restaurants/", async (req, res) => {
  let data = await db.select().from("restaurants");
  res.json(data)
})

app.post("/api/restaurants/", async (req, res) => {
  console.log(req.query.name)
  console.log(req.query.address)
  const test = await db.insert({name: req.query.name, address: req.query.address}).into("restaurants")
  res.json(test)
})

app.get("/api/restaurants/:rest_id/dishes", async (req, res) => {
  let data = await db.select().from("dishes").where({restaurant_id: req.params.rest_id})
  res.json(data)
})

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});