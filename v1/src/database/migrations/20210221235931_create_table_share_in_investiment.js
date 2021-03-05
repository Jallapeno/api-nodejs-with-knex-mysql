
exports.up = knex => knex.schema.createTable('shares_in_investments', (table) => {
    table.increments('id')
    // share foreign key
    table.integer('share_id').unsigned().notNullable()
    table.foreign('share_id').references('shares.id')
    .onDelete('CASCADE')

    // investment foreign key
    table.integer('investment_id').unsigned().notNullable()
    table.foreign('investment_id').references('investments.id')
    .onDelete('CASCADE')

    table.timestamps(true, true)
})

exports.down = knex => knex.schema.dropTable('shares_in_investments')
