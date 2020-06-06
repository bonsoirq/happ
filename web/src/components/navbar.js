import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavbarItem from 'components/navbar-item'
import logo from 'images/logo-navbar.png'
import AccountContext from 'contexts/account-context';
import SessionService from 'services/session-service';

export default function Navbar() {
  const context = useContext(AccountContext);

  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <NavbarItem>
        <Link to="/">
          <img alt="logo" src={logo} width="112" height="28" />
        </Link>
      </NavbarItem>
    </div>

    <div className="navbar-menu">
      <section className="navbar-start">
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
      </section>
      <section className="navbar-end">
        <NavbarItem>
          <div className="buttons">
            <AccountContext.Consumer>
              {({ currentAccount, setCurrentAccount }) => {
                return currentAccount != null ?
                <button
                  className="button is-light"
                  onClick={() => {
                    SessionService
                      .logOut()
                      .then(() => setCurrentAccount(null))
                  }}>
                  Log out
                </button>
                :
                <>
                <button className="button is-primary">
                  <strong>Sign up</strong>
                </button>
                <button className="button is-light">
                  Log in
                </button>
                </>
              }}
            </AccountContext.Consumer>

          </div>
        </NavbarItem>
      </section>
    </div>
  </nav>
  )
}
