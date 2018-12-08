/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext } from 'react'
import { Link, Match } from '@reach/router'
import cn from 'classnames'

import { UserContext } from '../contexts'

const MenuItem = ({ to, icon, children }) => {
  return (
    <Match path={to}>
      {props => (
        <li className={cn(props.match && 'uk-active')}>
          <Link to={to}>
            <span
              className="uk-margin-small-right"
              data-uk-icon={`icon: ${icon}`}
            />{' '}
            {children}
          </Link>
        </li>
      )}
    </Match>
  )
}

function Sidebar() {
  const { user } = useContext(UserContext)

  return (
    <aside id="left-col" className="uk-light uk-visible@m">
      <div className="profile-bar">
        <div
          className="uk-grid uk-grid-small uk-flex uk-flex-middle"
          data-uk-grid
        >
          <div className="uk-width-expand">
            <span className="uk-text-small uk-text-muted">Selamat datang</span>
            <h4 className="uk-margin-remove-vertical text-light">
              {user.name}
            </h4>
          </div>
        </div>
      </div>
      <div className="bar-content uk-position-relative">
        <ul className="uk-nav-default uk-nav-parent-icon" data-uk-nav>
          <li className="uk-nav-header">Menu</li>
          <MenuItem to="/" icon="home">
            Home
          </MenuItem>
          <MenuItem to="/product-list" icon="thumbnails">
            Produk
          </MenuItem>
          <MenuItem to="/variant-list" icon="nut">
            Variant
          </MenuItem>
          <MenuItem to="/pos" icon="cart">
            POS
          </MenuItem>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
