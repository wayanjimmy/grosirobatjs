const userFields = ['id', 'name', 'email', 'password_digest']

const distributorFields = ['id', 'name']

const productFields = ['id', 'name', 'category_id']

const categoryFields = ['id', 'name']

const variantFields = ['id', 'price', 'unit_of_measure', 'scaled_quantity']

const relationMaps = [
  {
    mapId: 'userMap',
    idProperty: 'id',
    properties: ['name', 'email']
  },
  {
    mapId: 'distributorMap',
    idProperty: 'id',
    properties: ['name']
  },
  {
    mapId: 'productMap',
    idProperty: 'id',
    properties: ['name', 'variants_count'],
    associations: [
      { name: 'category', mapId: 'categoryMap', columnPrefix: 'category_' }
    ],
    collections: [
      { name: 'variants', mapId: 'variantMap', columnPrefix: 'variant_' }
    ]
  },
  {
    mapId: 'categoryMap',
    idProperty: 'id',
    properties: ['name']
  },
  {
    mapId: 'variantMap',
    idProperty: 'id',
    properties: ['price', 'scaled_quantity', 'unit_of_measure']
  }
]

function getSelect(table, prefix, fields) {
  return fields.map(f => `${table}.${f} as ${prefix}_${f}`)
}

module.exports = {
  getSelect,
  productFields,
  relationMaps,
  categoryFields,
  variantFields,
  userFields,
  distributorFields
}
