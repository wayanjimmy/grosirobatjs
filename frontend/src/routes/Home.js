import React, { Component } from 'react'

import { authRequired } from '../utils/auth'
import Layout from '../views/Layout'

class Home extends Component {
  render() {
    return (
      <Layout>
        <h2>Home</h2>
      </Layout>
    )
  }
}

export default authRequired(Home)
