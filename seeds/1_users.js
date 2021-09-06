
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'TestUser1'},
        {username: 'Mousecop'},
        {username: 'ReijiGaga'},
      ]);
    });
};
