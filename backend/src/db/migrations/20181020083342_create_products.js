exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', t => {
      t.increments('id').primary()
      t.string('name')
      t.integer('category_id')
        .unsigned()
        .notNullable()
      t.timestamps(true, true)
      t.timestamp('deleted_at').nullable()

      t.foreign('category_id')
        .references('id')
        .inTable('categories')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('products', t => {
      t.dropForeign('category_id')
    }),
    knex.schema.dropTable('products')
  ])
}
