
exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.string("username").primary().notNullable().unique();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
