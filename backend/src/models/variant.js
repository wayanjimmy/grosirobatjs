const Model = require('./model')

class Variant extends Model {
  static tableName = 'variants'

  static get relationMappings() {
    const Product = require('./product')

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'variants.productId',
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = Variant
