const yup = require('yup')

const productSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    category_id: yup.number().required()
  })
  .noUnknown()

module.exports = productSchema
