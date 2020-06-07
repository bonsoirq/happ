import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import NavbarItem from 'components/navbar-item'
import logo from 'images/logo-navbar.png'
import AccountContext from 'contexts/account-context';
import SessionService from 'services/session-service';
import Paths from 'paths';

export default withRouter(Navbar)
function Navbar(props) {
  const { currentAccount } = useContext(AccountContext);
  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <NavbarItem>
        <Link to={Paths.Root}>
          <img alt="logo" src={logo} width="112" height="28" />
        </Link>
      </NavbarItem>
    </div>

    <div className="navbar-menu">
      <section className="navbar-start">
        <NavbarItem>
          <Link to={Paths.Root}>Home</Link>
        </NavbarItem>
      </section>
      <section className="navbar-end">
        <NavbarItem>
          <div className="buttons">
            { currentAccount != null
              ? <LogoutButton history={props.history} />
              : <>
                  <SignupButton />
                  <LoginButton />
                </>
            }
          </div>
        </NavbarItem>
      </section>
    </div>
  </nav>
  )
}

function LogoutButton (props) {
  const { setCurrentAccount } = useContext(AccountContext);
  return (
    <button
      className="button is-light"
      onClick={() => {
        SessionService
          .logOut()
          .then(() => {
            setCurrentAccount(null)
            props.history.push(Paths.Login)
          })
    }}>
      Log out
    </button>
  )
}

function SignupButton () {
  return (
    <Link to={Paths.Root} >
      <button className="button is-primary">
        <strong>Sign up</strong>
      </button>
    </Link>
  )
}

function LoginButton () {
  return (
    <Link to={Paths.Login} >
      <button className="button is-light">
        Log in
      </button>
    </Link>
  )
}
