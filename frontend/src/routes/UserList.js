import React, { Component } from 'react'
import { Formik } from 'formik'
import omit from 'lodash/omit'
import axios from 'axios'

import Layout from '../views/Layout'
import Paginator from '../containers/Paginator'
import InputText from '../views/InputText'
import InputMessage from '../views/InputMessage'
import EditButton from '../views/EditButton'

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

  handleEdit = user => {
    this.setState({ user: omit(user, ['created_at', 'updated_at']) })
  }

  handleDelete = async (user, fetch) => {
    if (window.confirm(`Yakin menghapus ${user.name} ?`)) {
      await axios.delete(`/users/${user.id}`)
      this.setState({ user: initUser() }, fetch)
    }
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
                    onClick={() => {
                      this.setState({ user: initUser() })
                    }}
                  >
                    Buat Baru
                  </button>
                </div>
              </div>
            </div>
            <Paginator
              url="/users"
              extraParams={{ search }}
              render={({ items, fetch, getPaginationProps }) => (
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
                            <td className="uk-text-center">
                              <EditButton
                                onClick={() => this.handleEdit(user)}
                              />
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
                      enableReinitialize
                      onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)
                        try {
                          if (values.id) {
                            await axios.put(`/users/${values.id}`, values)
                            fetch()
                          } else {
                            await axios.post('/users', values)
                            this.setState({ user: initUser() }, fetch)
                          }
                        } catch (err) {
                          actions.setErrors(err.response.data.data)
                        }

                        actions.setSubmitting(false)
                      }}
                      render={({
                        values,
                        errors,
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
                            <InputMessage error={errors.name} />
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
                            <InputMessage error={errors.email} />
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
                            <InputMessage error={errors.password} />
                          </div>
                          <div className="uk-margin uk-flex uk-flex-between">
                            <button
                              className="uk-button uk-button-primary"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? '...' : 'Simpan'}
                            </button>
                            <button
                              className="uk-button uk-button-danger"
                              type="button"
                              disabled={!values.id}
                              onClick={() => this.handleDelete(values, fetch)}
                            >
                              {isSubmitting ? '...' : 'Hapus'}
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
