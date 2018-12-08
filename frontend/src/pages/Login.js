import React, { useEffect, useContext } from 'react'
import { Formik } from 'formik'
import { navigate } from '@reach/router'
import ky from 'ky'

import * as authUtil from '../utils/auth'
import { UserContext } from '../contexts'
import Alert from '../views/Alert'
import InputText from '../views/InputText'

function transformErrorMessage(errors) {
  return Object.keys(errors).map(key => {
    return `${key}:${errors[key].join('')}`
  })
}

function Login() {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('uk-height-1-1')

    if (authUtil.isAuthenticated()) {
      navigate('/')
    }

    return () => {
      const body = document.getElementsByTagName('body')[0]
      body.classList.remove('uk-height-1-1')
    }
  })

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport">
      <div className="uk-width-medium uk-padding-small">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            try {
              const res = await ky
                .post('/api/auth/login', { json: values })
                .json()
              const { data: user } = res
              authUtil.setCurrentUser(user)
              setUser(user)
              navigate('/')
            } catch (error) {
              const res = await error.response.json()
              actions.setErrors({ error: transformErrorMessage(res.details) })
            }
            actions.setSubmitting(false)
          }}
          render={({
            values,
            errors,
            isSubmitting,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">Masuk</legend>
                {errors.error && <Alert danger>{errors.error}</Alert>}
                <div className="uk-margin">
                  <div className="uk-inline uk-width-1-1">
                    <span
                      className="uk-form-icon uk-form-icon-flip"
                      data-uk-icon="icon: user"
                    />
                    <InputText
                      type="email"
                      name="email"
                      required
                      placeholder="Surel"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <div className="uk-inline uk-width-1-1">
                    <span
                      className="uk-form-icon uk-form-icon-flip"
                      data-uk-icon="icon: lock"
                    />
                    <InputText
                      type="password"
                      name="password"
                      required
                      placeholder="Sandi"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <button
                    type="submit"
                    className="uk-button uk-button-primary uk-button-large uk-width-1-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Proses..' : 'Masuk'}
                  </button>
                </div>
              </fieldset>
            </form>
          )}
        />
      </div>
    </div>
  )
}

export default Login
