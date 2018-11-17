const Model = require('./model')

class User extends Model {
  static tableName = 'users'
}

module.exports = User
