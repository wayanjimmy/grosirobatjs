const yup = require('yup')

const variant = require('./variant')

const productSchema = yup
  .object()
  .shape({
    sku: yup
      .string()
      .required()
      .trim(),

    name: yup
      .string()
      .required()
      .trim(),

    categoryId: yup.number().required(),

    variants: yup
      .array()
      .of(variant)
      .when('$store', {
        is: true,
        then: yup
          .array()
          .of(variant)
          .required()
          .min(1)
      })
  })
  .noUnknown()

module.exports = productSchema
