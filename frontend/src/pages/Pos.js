/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'

import Layout from '../views/Layout'

function Pos() {
  const [search, setSearch] = useState('')

  return (
    <Layout withSidebar={false}>
      <div className="uk-width-1-1@l">
        <div className="uk-card uk-card-default uk-card-small uk-card-hover">
          <div className="uk-card-header">
            <div className="uk-flex">
              <ul data-uk-tab>
                <li>
                  <a onClick={() => {}}>Test</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="uk-card-body uk-grid">
            <div className="uk-width-1-1">
              <div className="uk-flex uk-flex-middle uk-margin-bottom">
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
                <div>
                  <button
                    className="uk-button uk-button-text uk-margin-left"
                    type="button"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small uk-margin-bottom">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col width="100" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th className="uk-text-right">Satuan</th>
                    <th className="uk-text-right">Harga</th>
                    <th className="uk-text-right">Pilihan</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>xxxxxx</td>
                    <td>Pcs</td>
                    <td className="uk-text-right">10000</td>
                    <td className="uk-text-right">
                      <input
                        type="number"
                        className="uk-input"
                        placeholder="1"
                        value={1}
                      />
                    </td>
                    <td>
                      <a className="uk-button uk-button-default">Tambah</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="uk-width-3-4">
              <div className="uk-flex uk-flex-middle uk-flex-between">
                <div>Barang belanja</div>
                <small>(4 Item,1 Pcs)</small>
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
                  <tr>
                    <td>1</td>
                    <td>Acnol</td>
                    <td className="uk-text-right">10000</td>
                    <td className="uk-text-right">1</td>
                    <td className="uk-text-right">10000</td>
                    <td />
                  </tr>
                  <tr>
                    <td colSpan={3} />
                    <td className="uk-text-right">Subtotal</td>
                    <td>10000</td>
                    <td />
                  </tr>
                  <tr>
                    <td colSpan={3} />
                    <td className="uk-text-right">Total</td>
                    <td>10000</td>
                    <td />
                  </tr>
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
                  <input
                    id="name"
                    className="uk-input"
                    type="text"
                    placeholder="Nama"
                  />
                </div>
                <div className="uk-margin">
                  <label htmlFor="phone" className="uk-form-label">
                    HP
                  </label>
                  <input
                    id="phone"
                    className="uk-input"
                    type="phone"
                    placeholder="089xxx"
                  />
                </div>
                <div className="uk-margin">
                  <label htmlFor="paid" className="uk-form-label">
                    Jumlah dibayar
                  </label>
                  <input
                    id="paid"
                    className="uk-input"
                    type="number"
                    placeholder="Rp 10000"
                  />
                </div>
                <div className="uk-margin">
                  <button
                    type="submit"
                    className="uk-button uk-button-primary uk-width-1-1"
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
  )
}

export default Pos
