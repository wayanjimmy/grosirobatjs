/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Formik } from 'formik'

import Layout from '../views/Layout'
import InputText from '../views/InputText'
import InputMessage from '../views/InputMessage'

function initVariant() {
  return {
    id: '',
    price: 0,
    scaledQuantity: 0,
    uom: ''
  }
}

function initProduct() {
  return {
    id: '',
    sku: '',
    name: '',
    categoryId: '',
    variants: [initVariant()]
  }
}

export default function ManageProductForm() {
  return (
    <Layout>
      <div className="uk-width-1-1@l">
        <Formik
          initialValues={initProduct()}
          render={({
            values,
            errors,
            isSubmitting,
            handleChange,
            submitForm,
            setFieldValue
          }) => (
            <div className="uk-card uk-card-default uk-card-small uk-card-hover">
              <div className="uk-card-header">
                <div className="uk-grid uk-grid-small">
                  <div className="uk-width-1-2">
                    <h2>Produk</h2>
                  </div>
                </div>
              </div>
              <div className="uk-card-body">
                <form className="uk-form-stacked uk-width-1-1">
                  <div className="uk-grid-small" data-uk-grid>
                    <div className="uk-width-1-2">
                      <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="sku">
                          Sku
                        </label>
                        <div className="uk-form-controls">
                          <InputText
                            name="sku"
                            placeholder="Sku"
                            value={values.sku}
                            onChange={handleChange}
                          />
                        </div>
                        <InputMessage error={errors.sku} />
                      </div>
                      <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="name">
                          Nama Produk
                        </label>
                        <div className="uk-form-controls">
                          <InputText
                            name="name"
                            placeholder="Nama Produk"
                            value={values.name}
                            onChange={handleChange}
                          />
                        </div>
                        <InputMessage error={errors.name} />
                      </div>
                    </div>
                    <div className="uk-width-1-2">
                      <div className="uk-margin">
                        <label
                          className="uk-form-label"
                          htmlFor="form-stacked-text"
                        >
                          Kategori
                        </label>
                        <div className="uk-form-controls" />
                        <InputMessage error={errors.category_id} />
                      </div>
                    </div>
                    <div className="uk-width-1-1">
                      <table className="uk-table">
                        <caption>variant</caption>
                        <thead>
                          <tr>
                            <th />
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Satuan</th>
                          </tr>
                        </thead>
                        <tfoot>
                          {values.variants.map((variant, index) => (
                            <tr key={index}>
                              <td className="uk-text-center uk-text-middle">
                                {index === 0 ? (
                                  <a
                                    className="uk-icon-link"
                                    data-uk-icon="plus-circle"
                                    data-uk-tooltip="Tambah"
                                    onClick={() => {
                                      const { variants } = values
                                      variants.push(initVariant())
                                      setFieldValue('variants', variants)
                                    }}
                                  >
                                    {''}
                                  </a>
                                ) : (
                                  <a
                                    className="uk-icon-link uk-text-danger"
                                    data-uk-icon="minus-circle"
                                    data-uk-tooltip="Hapus"
                                    onClick={() => {
                                      let { variants } = values
                                      variants = variants.filter(
                                        (v, i) => i !== index
                                      )
                                      setFieldValue('variants', variants)
                                    }}
                                  >
                                    {''}
                                  </a>
                                )}
                              </td>
                              <td>
                                <InputText
                                  type="number"
                                  name={`price_${index}`}
                                  placeholder="0"
                                  value={variant.price}
                                  onChange={e => {
                                    setFieldValue(
                                      `variants.${index}.price`,
                                      e.target.value
                                    )
                                  }}
                                />
                              </td>
                              <td>
                                <InputText
                                  type="number"
                                  name={`scaled_quantity_${index}`}
                                  placeholder="0"
                                  value={variant.scaledQuantity}
                                  onChange={e => {
                                    setFieldValue(
                                      `variants.${index}.scaledQuantity`,
                                      e.target.value
                                    )
                                  }}
                                />
                              </td>
                              <td>
                                <InputText
                                  name={`uom_${index}`}
                                  placeholder="Pcs"
                                  value={variant.uom}
                                  onChange={e => {
                                    setFieldValue(
                                      `variants.${index}.uom`,
                                      e.target.value
                                    )
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tfoot>
                        <tbody>
                          <tr>
                            <td />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>
              </div>
              <div className="uk-card-footer">
                <div className="uk-margin">
                  <button
                    className="uk-button uk-button-primary"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => submitForm()}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </Layout>
  )
}
