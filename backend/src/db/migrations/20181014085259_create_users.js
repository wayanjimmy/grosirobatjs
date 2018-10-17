exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', t => {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.string('email')
        .notNullable()
        .unique()
      t.string('password_digest').notNullable()
      t.timestamps(true, true)
      t.timestamp('deleted_at').nullable()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users')])
}
