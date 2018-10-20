import React from 'react'
import { Link, Match } from '@reach/router'
import cn from 'classnames'

import { CurrentUserContext } from '../contexts'

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

const Sidebar = () => (
  <aside id="left-col" className="uk-light uk-visible@m">
    <div className="profile-bar">
      <div
        className="uk-grid uk-grid-small uk-flex uk-flex-middle"
        data-uk-grid
      >
        <div className="uk-width-expand">
          <span className="uk-text-small uk-text-muted">Selamat datang</span>
          <CurrentUserContext.Consumer>
            {({ currentUser }) => (
              <h4 className="uk-margin-remove-vertical text-light">
                {currentUser.name}
              </h4>
            )}
          </CurrentUserContext.Consumer>
        </div>
      </div>
    </div>
    <div className="bar-content uk-position-relative">
      <ul className="uk-nav-default uk-nav-parent-icon" data-uk-nav>
        <li className="uk-nav-header">Menu</li>
        <MenuItem to="/user-list" icon="users">
          Pegawai
        </MenuItem>
        <MenuItem to="/category-list" icon="grid">
          Kategori
        </MenuItem>
        <MenuItem to="/distributor-list" icon="album">
          Distributor
        </MenuItem>
      </ul>
    </div>
  </aside>
)

export default Sidebar
