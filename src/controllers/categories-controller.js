const ex = require('../utils/express')
const { Category } = require('../models')

const index = ex.createRoute(async (req, res) => {
  const data = await Category.query()
    .orderBy('created_at', 'ASC')
    .whereNull('deleted_at')

  res.json({
    object: 'list',
    data: data.map(category => Category.transform(category))
  })
})

module.exports = {
  index
}
