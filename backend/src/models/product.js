const Model = require('./model')
const Category = require('./category')
const Variant = require('./variant')

class Product extends Model {
  static tableName = 'products'

  static relationMappings = {
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

module.exports = Product
