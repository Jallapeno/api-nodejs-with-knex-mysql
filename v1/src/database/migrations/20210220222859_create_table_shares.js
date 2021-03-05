
exports.up = knex => knex.schema.createTable('shares', (table) => {
    table.increments('id')
    table.string('name', 100).notNullable()
    table.float('percentage', 9, 2).unsigned().notNullable()

    table.timestamps(true, true)
})

exports.down = knex => knex.schema.dropTable('shares')
