import React, { Suspense, lazy, useState } from 'react'
import { Router } from '@reach/router'
import ky from 'ky'

import { UserContext } from '../contexts'
import * as authUtil from '../utils/auth'
import Loading from '../views/Loading'
import { useOnMount } from '../hooks'

function LazyImport(Component) {
  const ComponentLoadable = lazy(Component)
  return props => (
    <Suspense fallback={<Loading fullWidth />}>
      <ComponentLoadable {...props} />
    </Suspense>
  )
}

function PrivateRoute({ as: Comp, ...props }) {
  return authUtil.isAuthenticated() ? <Comp {...props} /> : <Login />
}

const Login = LazyImport(() => import('./Login'))
const Home = LazyImport(() => import('./Home'))
const ProductList = LazyImport(() => import('./ProductList'))
const ManageProductForm = LazyImport(() => import('./ManageProductForm'))
const VariantList = LazyImport(() => import('./VariantList'))

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
        console.log(error.response)
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
        <PrivateRoute as={ProductList} path="/product-list" />
        <PrivateRoute as={ManageProductForm} path="/products/new" />
        <PrivateRoute as={ManageProductForm} path="/products/:product" />
        <PrivateRoute as={VariantList} path="/variant-list" />
      </Router>
    </UserContext.Provider>
  )
}
