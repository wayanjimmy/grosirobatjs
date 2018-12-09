exports.up = knex => {
  return knex.schema.createTable('order_items', t => {
    t.increments('id').primary()
    t.integer('order_id')
      .unsigned()
      .notNullable()
    t.integer('variant_id')
      .unsigned()
      .notNullable()
    t.integer('quantity').notNullable()
    t.timestamps(true, true)

    t.foreign('order_id')
      .references('id')
      .inTable('orders')

    t.foreign('variant_id')
      .references('id')
      .inTable('variants')
  })
}

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTableIfExists('order_items')])
}
