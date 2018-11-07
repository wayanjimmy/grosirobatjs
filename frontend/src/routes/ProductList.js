import React, { Component } from 'react'
import { navigate } from '@reach/router'

import Paginator from '../containers/Paginator'
import Layout from '../views/Layout'
import EditButton from '../views/EditButton'

class ProductList extends Component {
  state = {
    search: ''
  }

  render() {
    const { search } = this.state

    return (
      <Layout>
        <div className="uk-width-1-1@l">
          <div className="uk-card uk-card-default uk-card-small uk-card-hover">
            <div className="uk-card-header">
              <div className="uk-grid uk-grid-small">
                <div className="uk-width-1-1">
                  <div className="uk-search uk-search-default">
                    <span data-uk-search-icon={''} />
                    <input
                      className="uk-search-input"
                      type="search"
                      placeholder="Cari produk"
                      defaultValue=""
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          this.setState({ search: e.target.value })
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="uk-width-expand uk-flex uk-flex-right">
                  <button
                    className="uk-button uk-button-text"
                    onClick={() => navigate('/products/new')}
                  >
                    Buat Baru
                  </button>
                </div>
              </div>
            </div>
            <Paginator
              url="/products"
              extraParams={{ search }}
              render={({ items, getPaginationProps }) => (
                <div className="uk-card-body uk-grid">
                  <div className="uk-width-1-1@l uk-width-1-1@s">
                    <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Kategori</th>
                          <th>Banyak Variant</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(product => (
                          <tr className="uk-visible-toggle" key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.variants_count}</td>
                            <td className="uk-text-center">
                              <EditButton
                                onClick={() =>
                                  navigate(`/products/${product.id}`)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Paginator.Pagination {...getPaginationProps()} />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProductList
