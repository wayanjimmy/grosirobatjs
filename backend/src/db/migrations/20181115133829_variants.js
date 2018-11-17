exports.up = knex => {
  return knex.schema.createTable('variants', t => {
    t.increments('id').primary()
    t.integer('product_id')
      .unsigned()
      .notNullable()
    t.bigInteger('price').notNullable()
    t.integer('scaled_quantity')
      .unsigned()
      .notNullable()
    t.string('uom').notNullable()
    t.timestamps(true, true)

    t.foreign('product_id')
      .references('id')
      .inTable('products')
  })
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('variants', t => {
      t.dropForeign('product_id')
    }),
    knex.schema.dropTableIfExists('variants')
  ])
}
