/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'

import Paginator from './Paginator'
import Price from './Price'

function VariantPicker({ onSelect }) {
  const [search, setSearch] = useState('')
  const searchRef = useRef()

  return (
    <Fragment>
      <div className="uk-flex uk-flex-middle uk-margin-bottom">
        <div className="uk-search uk-search-default">
          <span data-uk-search-icon={''} />
          <input
            className="uk-search-input"
            type="search"
            name="search"
            placeholder="Cari produk"
            defaultValue={search}
            ref={searchRef}
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
            onClick={() => {
              searchRef.current.value = ''
              setSearch('')
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <Paginator
        url="/api/variants"
        params={{ search, pageSize: 100 }}
        render={({ items }) =>
          search === '' ? null : (
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
                {items.map(variant => {
                  const quantityRef = React.createRef()
                  return (
                    <tr key={variant.id}>
                      <td>{variant.product.name}</td>
                      <td>{variant.uom}</td>
                      <td className="uk-text-right">
                        <Price value={variant.price} />
                      </td>
                      <td className="uk-text-right">
                        <input
                          type="number"
                          className="uk-input"
                          placeholder="1"
                          defaultValue={1}
                          ref={quantityRef}
                        />
                      </td>
                      <td>
                        <a
                          className="uk-button uk-button-default"
                          onClick={() => {
                            const quantity = +quantityRef.current.value
                            onSelect(variant, quantity)
                          }}
                        >
                          Tambah
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        }
      />
    </Fragment>
  )
}

VariantPicker.propTypes = {
  onSelect: PropTypes.func.isRequired
}

VariantPicker.defaultProps = {
  onSelect: () => {}
}

export default VariantPicker
