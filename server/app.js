

const express = require("express");
const path = require("path")
const connection = require('../knexfile')
const db = require("../knexfile");


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

app.post("/api/restaurants/:rest_id/dishes/", async (req, res) => {
  const id = Math.floor(Math.random() * 2000000);
  const dishes = await db.insert({id: id, dish: req.query.name, restaurant_id: req.params.rest_id}, ["id"]).into("dishes")
  console.log(...dishes)
  res.json(...dishes)
})

app.post("/api/dishes/:dish_id/", async (req, res) => {
  const id = Math.floor(Math.random() * 2000000);
  const reviews = await db.insert({id: id, username: req.query.username, dish_id: req.params.dish_id, score: req.query.score, comment: req.query.comment}).into("dish_reviews")
  res.json(reviews)
})

app.post("/api/restaurants/", async (req, res) => {
  const id = Math.floor(Math.random() * 2000000);
  const restaurants = await db.insert({id: id, name: req.query.name, address: req.query.address}).into("restaurants")
  res.json(restaurants)
})

app.get("/api/restaurants/:rest_id/dishes", async (req, res) => {
  let data = await db.select().from("dishes").where({restaurant_id: req.params.rest_id})
  res.json(data)
})

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
