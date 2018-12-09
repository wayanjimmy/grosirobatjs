/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useRef } from 'react'
import UIkit from 'uikit'

import ky from '../utils/api'
import Loading from '../views/Loading'
import Price from '../views/Price'

function OrderDetailModal({ orderNo }) {
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef()

  const fetchOrder = async () => {
    setIsLoading(true)
    const res = await ky.get(`/api/orders/${orderNo}`).json()
    setIsLoading(false)
    setOrder(res.data)
  }

  return (
    <Fragment>
      <a
        className="uk-icon-link uk-invisible-hover"
        data-uk-icon="chevron-double-right"
        data-uk-tooltip="Detail"
        onClick={async () => {
          await fetchOrder()
          UIkit.modal(modalRef.current).show()
        }}
      >
        {''}
      </a>
      <div data-uk-modal={''} ref={modalRef}>
        <div className="uk-modal-dialog">
          <button
            className="uk-modal-close-default"
            type="button"
            data-uk-close
          />
          <div className="uk-modal-header">
            <h3 className="uk-modal-title">Penjualan</h3>
          </div>
          <div className="uk-modal-body">
            <Loading isLoading={isLoading} fullWidth minHeight={500}>
              {order && (
                <div className="uk-card uk-card-default uk-card-body uk-width-1-1">
                  <table className="uk-table">
                    <tbody>
                      <tr>
                        <td>Order Number</td>
                        <td>{order.no}</td>
                      </tr>
                      <tr>
                        <td>Pelanggan</td>
                        <td>{order.customerName}</td>
                      </tr>
                      <tr>
                        <td>HP</td>
                        <td>
                          {order.customerPhone ? order.customerPhone : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="uk-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Produk</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.variant.product.name}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <Price
                              value={item.quantity * +item.variant.price}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2} />
                        <td>Total</td>
                        {(() => {
                          const total = order.items.reduce(
                            (carrier, item) =>
                              carrier + item.quantity * item.variant.price,
                            0
                          )
                          return (
                            <td>
                              <Price value={total} />
                            </td>
                          )
                        })()}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Loading>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderDetailModal
