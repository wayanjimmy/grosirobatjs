exports.up = knex => {
  return knex.schema.createTable('orders', t => {
    t.increments('id').primary()
    t.string('no').notNullable()
    t.string('customer_name').notNullable()
    t.string('customer_phone').nullable()
    t.bigInteger('total_amount').notNullable()
    t.timestamp('paid_at').nullable()

    t.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('orders')
}
