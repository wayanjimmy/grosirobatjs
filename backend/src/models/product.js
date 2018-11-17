const Model = require('./model')
const Category = require('./category')

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
    }
  }
}

module.exports = Product
