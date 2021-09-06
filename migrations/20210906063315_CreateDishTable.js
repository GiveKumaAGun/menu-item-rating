
exports.up = function(knex) {
  return knex.schema.createTable("dishes", function(table) {
    table.increments("id").unique();
    table.string("name").notNullable();
    table.integer("restaurant_id").notNullable()
    
    table.foreign("restaurant_id").references("id").inTable("restaurants").onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("dishes");

};
