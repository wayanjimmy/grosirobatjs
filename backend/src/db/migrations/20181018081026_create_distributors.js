exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('distributors', t => {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.timestamps(true, true)
      t.timestamp('deleted_at').nullable()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('distributors')])
}
