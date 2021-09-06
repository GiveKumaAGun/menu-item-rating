
exports.up = function(knex) {
  return knex.schema.createTable("dish_reviews", function(table) {
    table.increments("id").unique();
    table.integer("user_id").notNullable()
    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("dish_id").notNullable()
    table.foreign("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("score");
    table.string("comment");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("dish_reviews");

};
