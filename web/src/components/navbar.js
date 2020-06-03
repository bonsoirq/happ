import React from 'react'
import NavbarItem from 'components/navbar-item'
import logo from 'images/logo-navbar.png'

export default function Navbar() {
  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <NavbarItem>
        <a href="https://bulma.io">
          <img alt="logo" src={logo} width="112" height="28" />
        </a>
      </NavbarItem>
    </div>

    <div className="navbar-menu">
      <section className="navbar-start">
        <NavbarItem>
            Home
        </NavbarItem>
      </section>
      <section className="navbar-end">
        <NavbarItem>
          <div className="buttons">
            <button className="button is-primary">
              <strong>Sign up</strong>
            </button>
            <button className="button is-light">
              Log in
            </button>
          </div>
        </NavbarItem>
      </section>
    </div>
  </nav>
  )
}
