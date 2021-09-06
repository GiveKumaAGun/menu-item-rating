
exports.up = function(knex) {
  return knex.schema.createTable("dishes", function(table) {
    table.uuid("id");
    table.string("name").notNullable();
    table.uuid("restaurant_id").notNullable().references("id").inTable("restaurants").onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("dishes");

};
