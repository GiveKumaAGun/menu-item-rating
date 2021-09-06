
exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.uuid("id");
    table.string("username").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
