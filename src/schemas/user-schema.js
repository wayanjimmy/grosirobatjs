const yup = require('yup')

const userSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required()
      .trim(),

    email: yup
      .string()
      .required()
      .email()
      .lowercase()
      .trim(),

    password: yup.string().when('$validatePassword', {
      is: true,
      then: yup
        .string()
        .required()
        .min(8)
        .trim()
    })
  })
  .noUnknown()

module.exports = userSchema
