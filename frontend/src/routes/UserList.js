/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react'
import { Formik } from 'formik'

import Layout from '../views/Layout'
import Paginator from '../containers/Paginator'
import InputText from '../views/InputText'

function initUser() {
  return {
    id: null,
    name: '',
    email: '',
    password: ''
  }
}

class UserList extends Component {
  state = {
    search: '',
    user: initUser()
  }

  render() {
    const { search, user } = this.state

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
              render={({ items, getPaginationProps }) => (
                <div className="uk-card-body uk-grid">
                  <div className="uk-width-2-3@l uk-width-1-1@s">
                    <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(user => (
                          <tr className="uk-visible-toggle" key={user.id}>
                            <td>{user.name}</td>
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
                    <Paginator.Pagination {...getPaginationProps()} />
                  </div>
                  <div className="uk-width-1-3@l uk-width-1-1">
                    <Formik
                      initialValues={{ ...user }}
                      validate={values => {
                        let errors = {}
                        return errors
                      }}
                      render={({
                        values,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <form
                          onSubmit={handleSubmit}
                          className="uk-form-stacked"
                        >
                          <div className="uk-margin">
                            <label htmlFor="name" className="uk-form-label">
                              Nama
                            </label>
                            <div className="uk-form-controls">
                              <InputText
                                name="name"
                                placeholder="Nama"
                                value={values.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="email" className="uk-form-label">
                              Email
                            </label>
                            <div className="uk-form-controls">
                              <InputText
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="password">
                              Sandi
                            </label>
                            <div className="uk-form-controls">
                              <InputText
                                name="password"
                                type="password"
                                placeholder="****"
                                value={values.password || ''}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="uk-margin uk-flex uk-flex-between">
                            <button
                              className="uk-button uk-button-primary"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Simpan
                            </button>
                            <button
                              className="uk-button uk-button-danger"
                              type="button"
                              onClick={() => {}}
                            >
                              Hapus
                            </button>
                          </div>
                        </form>
                      )}
                    />
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
