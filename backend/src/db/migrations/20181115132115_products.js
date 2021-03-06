exports.up = knex => {
  return knex.schema.createTable('products', t => {
    t.increments('id').primary()
    t.string('sku').notNullable()
    t.string('name').notNullable()
    t.integer('category_id')
      .unsigned()
      .notNullable()
    t.integer('stock')
      .unsigned()
      .notNullable()
      .defaultTo(0)
    t.timestamps(true, true)
    t.boolean('deleted').defaultTo(false)

    t.foreign('category_id')
      .references('id')
      .inTable('categories')
  })
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('products', t => {
      t.dropForeign('category_id')
    }),
    knex.schema.dropTableIfExists('products')
  ])
}
