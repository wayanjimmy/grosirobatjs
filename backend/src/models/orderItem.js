const Model = require('./model')

class OrderItem extends Model {
  static tableName = 'order_items'

  static get relationMappings() {
    const Variant = require('./variant')

    return {
      variant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Variant,
        join: {
          from: 'order_items.variantId',
          to: 'variants.id'
        }
      }
    }
  }
}

module.exports = OrderItem
