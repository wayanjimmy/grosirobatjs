const yup = require('yup')

const distributorSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
})

module.exports = distributorSchema
