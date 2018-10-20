exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('variants', t => {
      t.increments('id').primary()
      t.integer('product_id')
        .unsigned()
        .notNullable()
      t.decimal('price', 8, 2).notNullable()
      t.integer('scaled_quantity').notNullable()
      t.string('unit_of_measure').notNullable()
      t.timestamps(true, true)
      t.timestamp('deleted_at').nullable()

      t.foreign('product_id')
        .references('id')
        .inTable('products')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('variants', t => {
      t.dropForeign('product_id')
    }),
    knex.schema.dropTable('variants')
  ])
}
