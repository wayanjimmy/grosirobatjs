const User = require('../models/user')

const PAGE_SIZE = 10

async function getDefaultSelect() {
  const { columns } = await User.fetchTableMetadata()
  const set = new Set(columns)
  set.delete('passwordDigest')
  return [...set]
}

function getPageTotal(total, pageSize) {
  return Math.ceil(total / pageSize)
}

module.exports = {
  all: async (query = {}) => {
    query.page = Number(query.page) || 0
    query.pageSize = Number(query.pageSize) || PAGE_SIZE
    query.orderBy = query.orderBy || 'name'
    query.select = await getDefaultSelect()

    const { total, results } = await User.query()
      .select(query.select)
      .orderBy(query.orderBy, 'desc')
      .page(query.page, query.pageSize)

    return {
      query,
      results,
      total,
      pageTotal: getPageTotal(total, query.pageSize)
    }
  }
}
