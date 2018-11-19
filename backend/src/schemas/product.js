const yup = require('yup')

const variant = yup.object().shape({
  price: yup.number().required(),

  scaledQuantity: yup
    .number()
    .required()
    .min(1),

  uom: yup
    .string()
    .required()
    .trim()
})

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
      .required()
      .min(1)
  })
  .noUnknown()

module.exports = productSchema
