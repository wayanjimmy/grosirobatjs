/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react'

import Layout from '../views/Layout'
import Paginator from '../containers/Paginator'

class UserList extends Component {
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
                <div className="uk-width-1-2">
                  <div className="uk-search uk-search-default">
                    <span data-uk-search-icon={''} />
                    <input
                      className="uk-search-input"
                      type="search"
                      placeholder="Cari pegawai"
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
                    onClick={() => {}}
                  >
                    Buat Baru
                  </button>
                </div>
              </div>
            </div>
            <Paginator
              url="/users"
              extraParams={{ search }}
              render={({ items }) => (
                <div className="uk-card-body uk-grid">
                  <div className="uk-width-2-3@l uk-width-1-1@s">
                    <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th className="uk-text-center">Peran</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(user => (
                          <tr className="uk-visible-toggle" key={user.id}>
                            <td>{user.name}</td>
                            <td className="uk-text-center">Test</td>
                            <td>
                              <a
                                className="uk-icon-link uk-invisible-hover"
                                data-uk-icon="pencil"
                                data-uk-tooltip="Sunting"
                                onClick={() => {}}
                              >
                                {''}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default UserList
