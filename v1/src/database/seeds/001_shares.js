
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('shares').del()
    .then(function () {
      // Inserts seed entries
      return knex('shares').insert([
        {
          name: "BBAS3",
          percentage: 28.1
        },
        {
          name: "VALE3",
          percentage: 20.71
        },
        {
          name: "PETR4",
          percentage: 21.63
        },
        {
          name: "CMIG3",
          percentage: 12.41
        },
        {
          name: "OIBR3",
          percentage: 17.15
        }
      ]);
    });
};
