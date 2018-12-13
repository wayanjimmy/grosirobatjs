/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import UIkit from 'uikit'
import { Formik } from 'formik'

import InputText from './InputText'

function StockInboundModal({ product }) {
  let modalRef = useRef(null)

  return (
    <Fragment>
      <a
        className="uk-icon-link uk-text-primary"
        data-uk-icon="plus-circle"
        data-uk-tooltip="Stok Masuk"
        onClick={() => {
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
            data-uk-close
          />
          <div className="uk-modal-header">
            <h3 className="uk-modal-title">Stok Masuk</h3>
          </div>
          <div className="uk-modal-body">
            <Formik
              initialValues={{
                productId: product.id,
                productName: product.name,
                variantId: null,
                amount: 0
              }}
              onSubmit={async (values, actions) => {
                console.log(values)
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
                        <div className="uk-form-controls" />
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
