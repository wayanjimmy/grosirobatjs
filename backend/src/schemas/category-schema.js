const yup = require('yup')

const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
})

module.exports = categorySchema
