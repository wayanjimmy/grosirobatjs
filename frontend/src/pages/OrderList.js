/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import Layout from '../views/Layout'
import Paginator from '../views/Paginator'
import Price from '../views/Price'
import DateFormat from '../views/DateFormat'
import OrderDetailModal from '../views/OrderDetailModal'

function OrderList() {
  const [search, setSearch] = useState('')

  return (
    <Layout>
      <div className="uk-width-1-1@l">
        <div className="uk-card uk-card-default uk-card-small uk-card-hover">
          <div className="uk-card-header">
            <div className="uk-grid uk-grid-small">
              <div className="uk-width-1-4">
                <div className="uk-search uk-search-default uk-width-1-1">
                  <span data-uk-search-icon={''} />
                  <input
                    className="uk-search-input"
                    placeholder="Cari"
                    type="search"
                    name="search"
                    defaultValue={search}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        setSearch(e.target.value)
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Paginator
            url="/api/orders"
            params={{ search }}
            render={({ items, getPaginationProps }) => (
              <div className="uk-card-body uk-grid">
                <div className="uk-width-1-1@l uk-width-1-1@s">
                  <div>
                    <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Pelanggan</th>
                          <th className="uk-text-right">Total</th>
                          <th>Tanggal</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((order, index) => (
                          <tr className="uk-visible-toggle" key={index}>
                            <td>{order.no}</td>
                            <td>{order.customerName}</td>
                            <td className="uk-text-right">
                              <Price value={order.totalAmount} />
                            </td>
                            <td>
                              <DateFormat value={order.createdAt} />
                            </td>
                            <td>
                              <OrderDetailModal orderNo={order.no} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Paginator.Pagination {...getPaginationProps()} />
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </Layout>
  )
}

export default OrderList
