const connection = require('../knexfile')
const db = require('knex')(connection) 


const express = require("express");
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/hello", async (req, res) => {
  let test = await db.select().from("users")
  console.log(test)
  res.json(test)
})

app.get("/:username/", async (req, res) => {
  let data = await db.select().from("dish_reviews").fullOuterJoin("dishes", "dish_reviews.dish_id", "dishes.id").fullOuterJoin("restaurants", "dishes.restaurant_id", "restaurants.id").where({username: req.params.username})
  res.json(data);
})

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});