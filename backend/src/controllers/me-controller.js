const ex = require('../utils/express')

const { User } = require('../models')

const index = ex.createRoute(async (req, res) => {
  const { id } = req.payload.sub

  const user = await User.query()
    .findById(id)
    .throwIfNotFound()

  res.json(User.transform(user))
})

module.exports = {
  index
}
