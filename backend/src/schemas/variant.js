const yup = require('yup')

const variant = yup
  .object()
  .shape({
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
  .noUnknown()

module.exports = variant
