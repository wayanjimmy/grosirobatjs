import React, { Component } from 'react'
import axios from 'axios'
import { Formik } from 'formik'

import Paginator from '../containers/Paginator'
import Layout from '../views/Layout'
import InputText from '../views/InputText'
import InputMessage from '../views/InputMessage'
import EditButton from '../views/EditButton'

function initCategory() {
  return {
    id: null,
    name: ''
  }
}

class CategoryList extends Component {
  state = {
    category: initCategory(),
    search: ''
  }

  handleEdit = category => {}

  handleDelete = (category, fetch) => {}

  render() {
    const { search, category } = this.state

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
                      placeholder="Cari kategori"
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
                      this.setState({ category: initCategory() })
                    }}
                  >
                    Buat Baru
                  </button>
                </div>
              </div>
            </div>
            <Paginator
              url="/categories"
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
                        {items.map(category => (
                          <tr className="uk-visible-toggle" key={category.id}>
                            <td>{category.name}</td>
                            <td className="uk-text-center">
                              <EditButton
                                onClick={() => this.handleEdit(category)}
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
                      initialValues={{ ...category }}
                      enableReinitialize
                      onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)
                        try {
                          if (values.id) {
                            await axios.put(`/categories/${values.id}`, values)
                            fetch()
                          } else {
                            await axios.post('/categories', values)
                            this.setState({ category: initCategory() }, fetch)
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

export default CategoryList
