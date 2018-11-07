import React, { useState } from 'react'
import { Formik } from 'formik'

import Layout from '../views/Layout'
import InputText from '../views/InputText'
import InputCategorySelect from '../containers/InputCategorySelect'

function initVariant() {
  return {
    id: null,
    name: '',
    price: 0,
    scaled_quantity: 0,
    unit_of_measure: ''
  }
}

function initProduct() {
  return {
    id: null,
    name: '',
    category: {
      value: '',
      label: ''
    },
    variants: [initVariant()]
  }
}

export default function ManageProductForm() {
  const [product] = useState(initProduct())

  return (
    <Layout>
      <div className="uk-width-1-1@l">
        <Formik
          initialValues={{ ...product }}
          enableReinitialize
          render={({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting
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
                <form
                  className="uk-form-stacked uk-width-1-1"
                  onSubmit={handleSubmit}
                >
                  <div className="uk-grid-small" data-uk-grid>
                    <div className="uk-width-1-2">
                      <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="name">
                          Name
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
                        <label className="uk-form-label">Kategori</label>
                        <div className="uk-form-controls">
                          <InputCategorySelect
                            value={values.category}
                            onChange={option =>
                              setFieldValue('category', option)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="uk-width-1-1">
                      <div className="uk-margin">
                        <table className="uk-table">
                          <caption>Variant</caption>
                          <thead>
                            <tr>
                              <th>Harga</th>
                              <th>Kuantitas</th>
                              <th>Satuan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {values.variants.map((variant, index) => (
                              <tr key={index}>
                                <td>
                                  <InputText
                                    name={`variant_price_${index}`}
                                    type="number"
                                    value={variant.price}
                                    placeholder="Rp 10000"
                                    onChange={e =>
                                      setFieldValue(
                                        `variants.${index}.price`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <InputText
                                    name={`variant_scaled_quantity_${index}`}
                                    type="number"
                                    placeholder="1"
                                    value={variant.scaled_quantity}
                                    onChange={e =>
                                      setFieldValue(
                                        `variants.${index}.scaled_quantity`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <InputText
                                    name={`variant_unit_of_measure_${index}`}
                                    placeholder="pcs"
                                    value={variant.unit_of_measure}
                                    onChange={e =>
                                      setFieldValue(
                                        `variants.${index}.unit_of_measure`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <a
                                    href="/"
                                    className={`uk-icon-link ${
                                      index === 0
                                        ? 'uk-text-primary'
                                        : 'uk-text-danger'
                                    }`}
                                    data-uk-icon={
                                      index === 0
                                        ? 'plus-circle'
                                        : 'minus-circle'
                                    }
                                    onClick={e => {
                                      e.preventDefault()
                                      let { variants } = values
                                      if (index === 0) {
                                        variants.push(initVariant())
                                      } else {
                                        variants = variants.filter(
                                          (_v, i) => i !== index
                                        )
                                      }
                                      setFieldValue('variants', variants)
                                    }}
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
                  </div>
                </form>
              </div>
              <div className="uk-card-footer">
                <div className="uk-margin">
                  <button
                    className="uk-button uk-button-primary"
                    type="submit"
                    disabled={isSubmitting}
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
