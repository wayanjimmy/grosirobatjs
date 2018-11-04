import React, { Component } from 'react'
import axios from 'axios'
import { Formik } from 'formik'

import Paginator from '../containers/Paginator'
import Layout from '../views/Layout'
import InputText from '../views/InputText'
import InputMessage from '../views/InputMessage'
import EditButton from '../views/EditButton'

function initDistributor() {
  return {
    id: null,
    name: ''
  }
}

function transformResponseToState(res) {
  const { data: distributor } = res
  return {
    id: distributor.id,
    name: distributor.name
  }
}

class DistributorList extends Component {
  state = {
    distributor: initDistributor(),
    search: ''
  }

  handleEdit = distributor => {
    this.setState({ distributor })
  }

  handleDelete = async (distributor, fetch) => {
    if (window.confirm('Yakin menghapus?')) {
      await axios.delete(`/distributors/${distributor.id}`)
      this.setState({ distributor: initDistributor() }, fetch)
    }
  }

  render() {
    const { search, distributor } = this.state

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
                      placeholder="Cari distributor"
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
                      this.setState({ distributor: initDistributor() })
                    }}
                  >
                    Buat Baru
                  </button>
                </div>
              </div>
            </div>
            <Paginator
              url="/distributors"
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
                        {items.map(distributor => (
                          <tr
                            className="uk-visible-toggle"
                            key={distributor.id}
                          >
                            <td>{distributor.name}</td>
                            <td className="uk-text-center">
                              <EditButton
                                onClick={() => this.handleEdit(distributor)}
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
                      initialValues={{ ...distributor }}
                      enableReinitialize
                      onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)
                        try {
                          if (values.id) {
                            const res = await axios.put(
                              `/distributors/${values.id}`,
                              values
                            )
                            this.setState(
                              { distributor: transformResponseToState(res) },
                              fetch
                            )
                          } else {
                            await axios.post('/distributors', values)
                            this.setState(
                              { distributor: initDistributor() },
                              fetch
                            )
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

export default DistributorList
