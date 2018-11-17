/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext } from 'react'
import { Link, navigate } from '@reach/router'

import { forgetCurrentUser } from '../utils/auth'
import { UserContext } from '../contexts'

function Header() {
  const { setUser } = useContext(UserContext)

  return (
    <header id="top-head" className="uk-position-fixed">
      <div className="uk-container uk-container-expand uk-background-primary">
        <nav className="uk-navbar uk-light" data-uk-navbar="mode:click">
          <div className="uk-navbar-left">
            <Link to="/" className="uk-navbar-item uk-logo">
              GrosirObat
            </Link>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <a data-uk-icon="icon:user">{''}</a>
                <div
                  className="uk-navbar-dropdown"
                  data-uk-drop={'pos: bottom-right'}
                >
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-nav-header">Akun</li>
                    <li className="uk-nav-divider" />
                    <li>
                      <a
                        onClick={() => {
                          if (window.confirm('Yakin keluar?')) {
                            forgetCurrentUser()
                            setUser({ id: '', name: '', email: '' })
                            navigate('/login')
                          }
                        }}
                      >
                        <span data-uk-icon="icon: sign-out" /> Keluar
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
