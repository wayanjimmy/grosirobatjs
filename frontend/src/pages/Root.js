import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Router } from '@reach/router'
import ky from 'ky'

import { UserContext } from '../contexts'
import * as authUtil from '../utils/auth'
import Loading from '../views/Loading'

function LazyImport(Component) {
  const ComponentLoadable = lazy(Component)
  return props => (
    <Suspense fallback={<Loading fullWidth />}>
      <ComponentLoadable {...props} />
    </Suspense>
  )
}

class PrivateRoute extends React.Component {
  static contextType = UserContext

  render() {
    const { as: Comp, ...props } = this.props

    if (this.context.user && this.context.user.id === '') {
      return <Login />
    }

    return <Comp {...props} />
  }
}

const Login = LazyImport(() => import('./Login'))
const Home = LazyImport(() => import('./Home'))

const useOnMount = onMount =>
  useEffect(() => {
    onMount && onMount()
  }, [])

export default function Root() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: ''
  })

  useOnMount(async () => {
    if (authUtil.isAuthenticated()) {
      try {
        const res = await ky
          .get('/api/auth/me', authUtil.getAuthHeader())
          .json()
        const { data: user } = res
        const currentUser = authUtil.getCurrentUser()
        authUtil.setCurrentUser({
          ...user,
          ...currentUser
        })
        setUser(user)
      } catch (error) {
        if (error.response.status === 401) {
          authUtil.setCurrentUser(null)
          setUser({
            id: '',
            name: '',
            email: ''
          })
        }
      }
    }
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <PrivateRoute as={Home} path="/" />
        <Login path="/login" />
      </Router>
    </UserContext.Provider>
  )
}
