/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import Layout from '../views/Layout'
import Paginator from '../views/Paginator'
import StockInboundModal from '../views/StockInboundModal'

function InventoryList() {
  const [search, setSearch] = useState('')

  return (
    <Layout>
      <div className="uk-width-1-1@l">
        <div className="uk-card uk-card-default uk-card-small uk-card-hover">
          <div className="uk-card-header">
            <div className="uk-grid uk-grid-small">
              <div className="uk-width-1-2">
                <div className="uk-search uk-search-default">
                  <span data-uk-search-icon={''} />
                  <input
                    className="uk-search-input"
                    type="search"
                    name="search"
                    placeholder="Cari produk"
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
            url="/api/products"
            params={{ search }}
            render={({ items, getPaginationProps }) => (
              <div className="uk-card-body uk-grid">
                <div className="uk-width-1-1@l uk-width-1-1@s">
                  <div>
                    <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small">
                      <thead>
                        <tr>
                          <th className="uk-text-right">Sku</th>
                          <th>Nama</th>
                          <th>Kategori</th>
                          <th className="uk-text-right">Stok</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(product => (
                          <tr className="uk-visible-toggle" key={product.id}>
                            <td className="uk-text-right">{product.sku}</td>
                            <td>
                              <div>{product.name}</div>
                            </td>
                            <td>{product.category.name}</td>
                            <td className="uk-text-right">{product.stock}</td>
                            <td className="uk-invisible-hover">
                              <StockInboundModal product={product} />{' '}
                              <a
                                className="uk-icon-link uk-text-danger"
                                data-uk-icon="minus-circle"
                                data-uk-tooltip="Stok Keluar"
                                onClick={() => {}}
                              >
                                {''}
                              </a>
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

export default InventoryList
