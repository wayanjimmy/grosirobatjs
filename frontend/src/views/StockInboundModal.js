/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import UIkit from 'uikit'
import { Formik } from 'formik'

import InputText from './InputText'
import InputVariantSelect from './InputVariantSelect'

function StockInboundModal({ product }) {
  let [show, setShow] = useState(false)
  let modalRef = useRef(null)

  return (
    <Fragment>
      <a
        className="uk-icon-link uk-text-primary"
        data-uk-icon="plus-circle"
        data-uk-tooltip="Stok Masuk"
        onClick={() => {
          setShow(true)
          UIkit.modal(modalRef.current).show()
        }}
      >
        {''}
      </a>
      <div data-uk-modal={''} ref={modalRef}>
        <div className="uk-modal-dialog">
          <button
            className="uk-modal-close-default"
            type="button"
            onClick={() => {
              setShow(false)
              UIkit.modal(modalRef.current).hide()
            }}
          />
          <div className="uk-modal-header">
            <h3 className="uk-modal-title">Stok Masuk</h3>
          </div>
          <div className="uk-modal-body">
            {show && (
              <Formik
                initialValues={{
                  productId: product.id,
                  productName: product.name,
                  amount: 0,
                  variant: {
                    value: '',
                    label: ''
                  }
                }}
                onSubmit={async (values, actions) => {
                }}
                render={({
                  values,
                  isSubmitting,
                  handleChange,
                  handleSubmit,
                  setFieldValue
                }) => (
                  <form className="uk-form-stacked" onSubmit={handleSubmit}>
                    <div className="uk-grid uk-grid-small">
                      <div className="uk-width-1-1">
                        <div className="uk-margin">
                          <label htmlFor="product" className="uk-form-label">
                            Produk
                          </label>
                          <div className="uk-form-controls">
                            <input
                              className="uk-input"
                              id="product"
                              type="text"
                              value={values.productName}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="uk-margin">
                          <label htmlFor="branch" className="uk-form-label">
                            Satuan
                          </label>
                          <div className="uk-form-controls">
                            <InputVariantSelect
                              placeholder="Satuan"
                              productId={values.productId}
                              value={values.variant}
                              mapOption={option => ({
                                value: option.id,
                                label: option.uom
                              })}
                              onChange={variant =>
                                setFieldValue('variant', variant)
                              }
                            />
                          </div>
                        </div>
                        <div className="uk-margin">
                          <label className="uk-form-label" htmlFor="amount">
                            Qty
                          </label>
                          <div className="uk-form-controls">
                            <InputText
                              type="number"
                              name="amount"
                              placeholder="10"
                              min={0}
                              value={values.amount}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
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
                  </form>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

StockInboundModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
}

export default StockInboundModal
