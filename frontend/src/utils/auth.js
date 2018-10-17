import React from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'

const KEY = 'GB_CURRENT_USER'

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(KEY))
}

export function setCurrentUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user))
  setDefaultAuthHeaders()
}

export function forgetCurrentUser() {
  localStorage.setItem(KEY, null)
}

export function isAuthenticated() {
  return !!getCurrentUser()
}

export function setDefaultAuthHeaders() {
  if (!isAuthenticated) {
    return
  }

  const user = getCurrentUser()

  if (!user) {
    return
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token || ''}`
}

export function authRequired(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      if (!isAuthenticated()) {
        navigate('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
