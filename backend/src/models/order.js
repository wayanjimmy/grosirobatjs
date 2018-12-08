const Model = require('./model')

class Order extends Model {
  static tableName = 'orders'

  static get relationMappings() {
    const OrderItem = require('./orderItem')

    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'orders.id',
          to: 'order_items.product_id'
        }
      }
    }
  }
}

module.exports = Order
