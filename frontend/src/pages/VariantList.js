/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Formik } from 'formik'
import pick from 'lodash/pick'

import Layout from '../views/Layout'
import Paginator from '../views/Paginator'
import InputText from '../views/InputText'
import InputMessage from '../views/InputMessage'
import Price from '../views/Price'
import ky from '../utils/api'

function initVariant() {
  return {
    id: '',
    price: 0,
    scaledQuantity: 0,
    uom: ''
  }
}

export default function VariantList() {
  const [search, setSearch] = useState('')
  const [variant, setVariant] = useState(initVariant())

  const handleEdit = selectedVariant => {
    setVariant(pick(selectedVariant, ['id', 'price', 'scaledQuantity', 'uom']))
  }

  const handleDelete = async (selectedVariant, fetch) => {
    if (window.confirm(`Yakin menghapus?`)) {
      await ky.delete(`/api/variants/${selectedVariant.id}`).json()
      fetch()
    }
  }

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
                    placeholder="Cari variant"
                    defaultValue={search}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        setSearch(e.target.value)
                      }
                    }}
                  />
                </div>
              </div>
              <div className="uk-width-expand uk-flex uk-flex-right" />
            </div>
          </div>
          <Paginator
            url="/api/variants"
            params={{ search }}
            render={({ items, fetch, getPaginationProps }) => (
              <div className="uk-card-body uk-grid">
                <div className="uk-width-2-3@l uk-width-1-1@s">
                  <div>
                    <table className="uk-table uk-table-hover uk-table-divider uk-table-middle uk-table-small">
                      <thead>
                        <tr>
                          <th>Produk</th>
                          <th>Harga</th>
                          <th>Qty</th>
                          <th>Satuan</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(variant => (
                          <tr className="uk-visible-toggle" key={variant.id}>
                            <td>{variant.product.name}</td>
                            <td>
                              <Price value={variant.price} />
                            </td>
                            <td>{variant.scaledQuantity}</td>
                            <td>{variant.uom}</td>
                            <td>
                              <a
                                className="uk-icon-link uk-invisible-hover"
                                data-uk-icon="pencil"
                                data-uk-tooltip="Sunting"
                                onClick={() => handleEdit(variant)}
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
                <div className="uk-width-1-3@l uk-width-1-1@s">
                  <Formik
                    initialValues={variant}
                    enableReinitialize
                    onSubmit={async (values, actions) => {
                      actions.setSubmitting(true)
                      actions.setSubmitting(false)
                    }}
                    render={({
                      values,
                      errors,
                      isSubmitting,
                      handleSubmit,
                      handleChange
                    }) => (
                      <form className="uk-form-stacked" onSubmit={handleSubmit}>
                        <div className="uk-margin">
                          <label
                            className="uk-form-label"
                            htmlFor="scaledQuantity"
                          >
                            Harga
                          </label>
                          <div className="uk-form-controls">
                            <InputText
                              name="scaledQuantity"
                              type="number"
                              placeholder="1"
                              value={values.scaledQuantity}
                              onChange={handleChange}
                            />
                          </div>
                          <InputMessage error={errors.scaledQuantity} />
                        </div>
                        <div className="uk-margin">
                          <label className="uk-form-label" htmlFor="price">
                            Qty
                          </label>
                          <div className="uk-form-controls">
                            <InputText
                              name="price"
                              type="number"
                              placeholder="0"
                              value={values.price}
                              onChange={handleChange}
                            />
                          </div>
                          <InputMessage error={errors.price} />
                        </div>

                        <div className="uk-margin">
                          <label className="uk-form-label" htmlFor="uom">
                            Satuan
                          </label>
                          <div className="uk-form-controls">
                            <InputText
                              name="uom"
                              placeholder="Pcs"
                              value={values.uom}
                              onChange={handleChange}
                            />
                          </div>
                          <InputMessage error={errors.uom} />
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
                            disabled={!values.id}
                            onClick={() => handleDelete(variant, fetch)}
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
