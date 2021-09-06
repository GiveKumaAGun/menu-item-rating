
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {id: 1, name: 'Code Chrysalis', address: 'Near me?'},
        {id: 2, name: 'WacArnolds', address: ''},
      ]);
    });
};
