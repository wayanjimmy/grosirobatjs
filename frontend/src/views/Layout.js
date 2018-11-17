import React from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="uk-offcanvas-content">
      <Header />
      <Sidebar />
      <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">{children}</div>
      </div>
    </div>
  )
}
