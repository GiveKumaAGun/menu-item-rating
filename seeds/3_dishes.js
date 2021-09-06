
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dishes').del()
    .then(function () {
      // Inserts seed entries
      return knex('dishes').insert([
        {id: 1, dish: 'Coffee', restaurant_id: '1'},
        {id: 2, dish: 'Snacks', restaurant_id: '1'},
        {id: 3, dish: 'Burger', restaurant_id: '2'},
      ]);
    });
};
