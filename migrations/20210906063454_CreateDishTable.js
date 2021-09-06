
exports.up = function(knex) {
  return knex.schema.createTable("dish_reviews", function(table) {
    table.uuid("id");
    table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.uuid("dish_id").notNullable().references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("score");
    table.string("comment");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("dish_reviews");

};
