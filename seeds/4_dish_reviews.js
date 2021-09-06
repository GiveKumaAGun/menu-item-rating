
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dish_reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('dish_reviews').insert([
        {id: 1, username: "test", dish_id: 1, score: 10, comment: "Test comment please ignore"},
        {id: 2, username: "test", dish_id: 3, score: 9, comment: "Test comment please ignore2"},
        {id: 3, username: "Mousecop", dish_id: 1, score: 8, comment: "Test comment please ignore3"},
        {id: 4, username: "Mousecop", dish_id: 2, score: 7, comment: "Test comment please ignore4"},
        {id: 5, username: "test", dish_id: 2, score: 6, comment: "Test comment please ignore5"},
        {id: 6, username: "ReijiGaga", dish_id: 3, score: 5, comment: "Test comment please ignore6"},
      ]);
    });
};
