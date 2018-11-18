const Category = require('../models/category')

async function getDefaultSelect() {
  const { columns } = await Category.fetchTableMetadata()
  const set = new Set(columns)
  return [...set]
}

async function index(_req, res) {
  const select = await getDefaultSelect()
  const categories = await Category.query()
    .select(select)
    .orderBy('createdAt', 'desc')

  res.json({ data: categories })
}

module.exports = {
  index
}
