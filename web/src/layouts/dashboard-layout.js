import React, { useContext } from 'react';
import Title from 'components/title'
import AccountContext from 'contexts/account-context';
import { NavLink } from 'react-router-dom';
import Paths from 'paths';

export default function DashboardLayout (props) {
  const { currentAccount } = useContext(AccountContext);
  return (
    <section>
      <div className="container">
        <Title>Hello, {currentAccount.name}</Title>
        <div className="columns">
          <div className="column is-one-fifth">
            <Sidemenu />
          </div>
          <div className="column">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  )
}

function Sidemenu () {
  return (
    <aside className="menu">
      <p className="menu-label">
        General
      </p>
      <ul className="menu-list">
        <li><NavLink to={Paths.Dashboard} activeClassName="is-active">Happenings</NavLink></li>
        <li><NavLink to={Paths.Account} activeClassName="is-active">Account</NavLink></li>
      </ul>
    </aside>
  )
}
