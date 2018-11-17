/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { navigate } from '@reach/router'

import Layout from '../views/Layout'

export default function ProductList() {
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
              <div className="uk-width-expand uk-flex uk-flex-right">
                <a
                  className="uk-button uk-button-text"
                  onClick={() => navigate('/products/new')}
                >
                  Buat Baru
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
