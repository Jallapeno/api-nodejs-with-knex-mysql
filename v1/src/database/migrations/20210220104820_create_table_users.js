
exports.up = knex => knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name', 50).notNullable()
    table.string('username').unique().notNullable()
    table.string('email').notNullable()
    table.string('password', 20).notNullable()
    table.enu('active', ['S', 'N']).defaultTo('S')

    table.timestamps(true, true)
})

exports.down = knex => knex.schema.dropTable('users')
