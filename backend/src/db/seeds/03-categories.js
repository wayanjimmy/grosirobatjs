const _ = require('lodash')

exports.seed = knex => {
  return knex('categories')
    .del()
    .then(function() {
      const categories = ['Paten', 'OTC', 'Generik', 'Topikal'].map(
        categoryName => ({
          name: categoryName,
          slug: _.snakeCase(categoryName),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      )
      return knex('categories').insert(categories)
    })
}
