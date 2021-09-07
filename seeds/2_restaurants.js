
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {id: 1, name: 'Code Chrysalis', address: '123 Realplace'},
        {id: 2, name: 'McArnolds', address: '999 Shinjuku'},
        {id: 3, name: "My Beautiful House", address: "if I had one"}
      ]);
    });
};
