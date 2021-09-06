
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dishes').del()
    .then(function () {
      // Inserts seed entries
      return knex('dishes').insert([
        {id: 1, name: 'Coffee', restaurant_id: '1'},
        {id: 2, name: 'Snacks', restaurant_id: '1'},
        {id: 3, name: 'Burger', restaurant_id: '2'},
      ]);
    });
};
