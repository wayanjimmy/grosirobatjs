const { User } = require('../models')

function index(req, res) {
  const users = User.query().map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }))

  res.json(users)
}

module.exports = {
  index
}
