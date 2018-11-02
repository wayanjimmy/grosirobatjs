const yup = require('yup')

const distributorSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required()
      .trim()
  })
  .noUnknown()

module.exports = distributorSchema
