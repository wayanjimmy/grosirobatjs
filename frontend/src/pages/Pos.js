import React from 'react'
import {Formik} from 'formik'

import Layout from '../views/Layout'
import VariantPicker from '../views/VariantPicker'
import Price from '../views/Price'
import InputText from '../views/InputText'
import InputMessage from '../views/InputMessage'

function initOrder() {
  return {
    customerName: '',
    customerPhone: '',
    paidAmount: 0,
    items: []
  }
}

function calculateTotalOrder(order) {
  return order.items.reduce(
    (carrier, item) => carrier + item.quantity * item.variant.price,
    0
  )
}

function OrderItemSummary({order}) {
  let itemCount = order.items.length

  if (itemCount === 0) {
    return null
  }

  let uoms = {}
  order.items.forEach(item => {
    let initialQuantity = uoms[item.variant.uom] || 0
    uoms[item.variant.uom] = initialQuantity + item.quantity
  })

  let uomSummary = Object.keys(uoms)
    .map(uom => `${uoms[uom]} ${uom}`)
    .join(',')

  return `(${itemCount} Items,${uomSummary})`
}

function Pos() {
  return (
    <Formik
      initialValues={{orders: [initOrder()], currentOrderIndex: 0}}
      validate={values => {
        let errors = {}
        return errors
      }}
      render={({values, errors, setFieldValue}) => (
        <Layout withSidebar={false}>
          <div className="uk-width-1-1@l">
            <div className="uk-card uk-card-default uk-card-small uk-card-hover">
              <div className="uk-card-header">
                <div className="uk-flex">
                  <ul data-uk-tab>
                    {values.orders.map((_order, index) => (
                      <li key={index}>
                        <a onClick={() => {}}>Transaksi.{index + 1}</a>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <a
                      href="/"
                      className="uk-icon-link"
                      data-uk-icon="plus"
                      onClick={e => {
                        e.preventDefault()
                        let orders = [...values.orders, initOrder()]
                        setFieldValue('orders', orders)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="uk-card-body uk-grid">
                <div className="uk-width-1-1">
                  <VariantPicker
                    onSelect={(variant, quantity) => {
                      let {items} = values.orders[values.currentOrderIndex]
                      let alreadyExists = items.some(
                        item => item.variant.id === variant.id
                      )
                      if (alreadyExists) {
                        items = items.map(item => {
                          if (item.variant.id === variant.id) {
                            return {
                              ...item,
                              quantity: item.quantity + quantity
                            }
                          }
                          return item
                        })
                      } else {
                        items.push({variant, quantity})
                      }
                      setFieldValue(
                        `orders.${values.currentOrderIndex}.items`,
                        items
                      )
                    }}
                  />
                </div>
                <div className="uk-width-3-4">
                  <div className="uk-flex uk-flex-middle uk-flex-between">
                    <div>Barang belanja</div>
                    <small>
                      <OrderItemSummary
                        order={values.orders[values.currentOrderIndex]}
                      />
                    </small>
                  </div>
                  <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Produk</th>
                        <th className="uk-text-right">Harga Satuan</th>
                        <th className="uk-text-right">Qty</th>
                        <th className="uk-text-right">Subtotal</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {values.orders[values.currentOrderIndex].items.map(
                        (item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.variant.product.name}</td>
                            <td className="uk-text-right">
                              <Price value={item.variant.price} />
                            </td>
                            <td className="uk-text-right">
                              {item.quantity + ' ' + item.variant.uom}
                            </td>
                            <td className="uk-text-right">
                              <Price
                                value={item.quantity * item.variant.price}
                              />
                            </td>
                            <td>
                              {values.orders[values.currentOrderIndex].items
                                .length > 1 && (
                                <a
                                  className="uk-icon-link uk-text-danger"
                                  data-uk-icon="minus-circle"
                                  onClick={() => {}}
                                >
                                  {''}
                                </a>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                      {(() => {
                        let total = calculateTotalOrder(
                          values.orders[values.currentOrderIndex]
                        )
                        return (
                          <tr>
                            <td colSpan={3} />
                            <td className="uk-text-right">Total</td>
                            <td className="uk-text-right">
                              <Price value={total} />
                            </td>
                            <td />
                          </tr>
                        )
                      })()}
                    </tbody>
                  </table>
                </div>
                <div className="uk-width-1-4">
                  <div>Pelanggan</div>
                  <form className="uk-form-stacked uk-margin-top">
                    <div className="uk-margin">
                      <label htmlFor="name" className="uk-form-label">
                        Nama
                      </label>
                      <div className="uk-form-controls">
                        <InputText
                          name="customerName"
                          placeholder="Nama"
                          value={
                            values.orders[values.currentOrderIndex].customerName
                          }
                          onChange={e =>
                            setFieldValue(
                              `orders.${values.currentOrderIndex}.customerName`,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <InputMessage error={errors.customerName} />
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="phone" className="uk-form-label">
                        HP
                      </label>
                      <div className="uk-form-controls">
                        <InputText
                          type="phone"
                          name="customerPhone"
                          placeholder="089xxx"
                          value={
                            values.orders[values.currentOrderIndex]
                              .customerPhone
                          }
                          onChange={e =>
                            setFieldValue(
                              `orders.${
                                values.currentOrderIndex
                              }.customerPhone`,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="paid" className="uk-form-label">
                        Jumlah dibayar
                      </label>
                      <div className="uk-form-controls">
                        <InputText
                          type="number"
                          name="paid"
                          placeholder="Rp 10000"
                          value={
                            values.orders[values.currentOrderIndex].paidAmount
                          }
                          onChange={e =>
                            setFieldValue(
                              `orders.${values.currentOrderIndex}.paidAmount`,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <button
                        type="submit"
                        className="uk-button uk-button-primary uk-width-1-1"
                        disabled={
                          calculateTotalOrder(
                            values.orders[values.currentOrderIndex]
                          ) > values.orders[values.currentOrderIndex].paidAmount
                        }
                        onClick={e => {
                          e.preventDefault()
                          let order = values.orders[values.currentOrderIndex]
                          console.log(order)
                        }}
                      >
                        Proses
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    />
  )
}

export default Pos
