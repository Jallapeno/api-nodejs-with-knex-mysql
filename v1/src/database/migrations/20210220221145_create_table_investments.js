
exports.up = knex => knex.schema.createTable('investments', (table) => {
    table.increments('id')
    table.string('name', 100).notNullable()
    table.string('objective', 100).notNullable()
    table.float('totalBalanceAvailable', 9, 2).unsigned().notNullable()
    table.enu('indicator', ['S', 'N']).defaultTo('N')

    // foreign key
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id')
    .onDelete('CASCADE')

    table.timestamps(true, true)
})

exports.down = knex => knex.schema.dropTable('investments')
