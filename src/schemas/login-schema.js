const yup = require('yup')

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .lowercase()
    .trim(),

  password: yup
    .string()
    .required()
    .trim()
})

module.exports = loginSchema
