const yup = require('yup')

const orderItemSchema = yup.object().shape({
  variantId: yup.number().required(),

  quantity: yup.number().required()
})

const orderSchema = yup.object().shape({
  customerName: yup.string().required(),

  customerPhone: yup.string(),

  items: yup
    .array()
    .of(orderItemSchema)
    .required()
    .min(1)
})

module.exports = orderSchema
