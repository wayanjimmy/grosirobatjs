const Model = require('./model')

class Product extends Model {
  static tableName = 'products'

  static get relationMappings() {
    const Category = require('./category')
    const Variant = require('./variant')

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'products.categoryId',
          to: 'categories.id'
        }
      },
      variants: {
        relation: Model.HasManyRelation,
        modelClass: Variant,
        join: {
          from: 'products.id',
          to: 'variants.product_id'
        }
      }
    }
  }
}

module.exports = Product
