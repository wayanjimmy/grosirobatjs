const productFields = ['id', 'name', 'category_id']

const categoryFields = ['id', 'name']

const relationMaps = [
  {
    mapId: 'productMap',
    idProperty: 'id',
    properties: ['name'],
    associations: [
      { name: 'category', mapId: 'categoryMap', columnPrefix: 'category_' }
    ]
  },
  {
    mapId: 'categoryMap',
    idProperty: 'id',
    properties: ['name']
  }
]

function getSelect(table, prefix, fields) {
  return fields.map(f => `${table}.${f} as ${prefix}_${f}`)
}

module.exports = {
  getSelect,
  productFields,
  relationMaps,
  categoryFields
}
