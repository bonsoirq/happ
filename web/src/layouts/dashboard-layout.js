import React, { useContext } from 'react';
import Title from 'components/title'
import AccountContext from 'contexts/account-context';
import { NavLink } from 'react-router-dom';

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
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><NavLink to="/dashboard" activeClassName="is-active">Happenings</NavLink></li>
        <li><NavLink to="/account" activeClassName="is-active">Account</NavLink></li>
      </ul>
    </aside>
  )
}
