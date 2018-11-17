exports.up = knex => {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.string('email')
      .notNullable()
      .unique()
    t.string('password_digest').notNullable()
    t.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('users')
}
