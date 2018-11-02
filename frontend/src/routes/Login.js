import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { navigate } from '@reach/router'

import * as authUtil from '../utils/auth'
import { CurrentUserContext } from '../contexts'
import Alert from '../views/Alert'

class Login extends Component {
  componentDidMount() {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('uk-height-1-1')

    if (authUtil.isAuthenticated()) {
      navigate('/')
    }
  }

  componentWillUnmount() {
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('uk-height-1-1')
  }

  render() {
    return (
      <div className="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport">
        <div className="uk-width-medium uk-padding-small">
          <CurrentUserContext.Consumer>
            {({ setCurrentUser }) => (
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values, actions) => {
                  try {
                    actions.setSubmitting(true)
                    const res = await axios.post('/auth/login', values)
                    const { data: user } = res
                    authUtil.setCurrentUser(user)
                    setCurrentUser(user)
                    actions.setSubmitting(false)
                    navigate('/')
                  } catch (err) {
                    const response = err.response.data.data
                    const message = Object.keys(response).map(key => {
                      return `${key}: ${response[key].join(',')}`
                    })
                    actions.setErrors({ message: message.join(',') })
                    actions.setSubmitting(false)
                  }
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
                      {errors.message && <Alert danger>{errors.message}</Alert>}
                      <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                          <span
                            className="uk-form-icon uk-form-icon-flip"
                            data-uk-icon="icon: user"
                          />
                          <input
                            name="email"
                            className="uk-input uk-form-large"
                            required
                            placeholder="Surel"
                            type="text"
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
                          <input
                            name="password"
                            className="uk-input uk-form-large"
                            required
                            placeholder="Sandi"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="uk-margin">
                        <button
                          type="submit"
                          className="uk-button uk-button-primary uk-button-primary uk-button-large uk-width-1-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Proses..' : 'Masuk'}
                        </button>
                      </div>
                    </fieldset>
                  </form>
                )}
              />
            )}
          </CurrentUserContext.Consumer>
        </div>
      </div>
    )
  }
}

export default Login
