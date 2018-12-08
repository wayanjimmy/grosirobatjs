const Model = require('./model')

class OrderItem extends Model {
  static tableName = 'order_items'

  static get relationMappings() {
    const Order = require('./order')

    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'orderItems.orderId',
          to: 'orders.id'
        }
      }
    }
  }
}

module.exports = OrderItem
