import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Sidebar from './Sidebar'
import './Layout.css'

function Layout({ children, withSidebar }) {
  return (
    <div className="uk-offcanvas-content">
      <Header />
      {withSidebar && <Sidebar />}
      <div
        id={withSidebar ? 'content' : 'pos-content'}
        data-uk-height-viewport="expand: true"
      >
        <div className="uk-container uk-container-expand">{children}</div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  withSidebar: PropTypes.bool.isRequired
}

Layout.defaultProps = {
  withSidebar: true
}

export default Layout
