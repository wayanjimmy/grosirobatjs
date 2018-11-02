const yup = require('yup')

const categorySchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required()
      .trim()
  })
  .noUnknown()

module.exports = categorySchema
