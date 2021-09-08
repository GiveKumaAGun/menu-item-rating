
exports.up = function(knex) {
  return knex.schema.createTable("restaurants", function(table) {
    table.increments("id").primary().unique();
    table.string("name").notNullable();
    table.string("address");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("restaurants");

};
