exports.up = knex => {
  return knex.schema.createTable('categories', t => {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.string('slug').notNullable()
    t.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('categories')
}
