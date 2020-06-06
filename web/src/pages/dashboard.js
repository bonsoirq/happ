import React, { useContext } from 'react';
import Title from 'components/title'
import AccountContext from 'contexts/account-context';

export default function Dashboard () {
  const { currentAccount } = useContext(AccountContext);
  return (
  <section>
    <div className="container">
      <Title>Hello, {currentAccount.name}</Title>
      <div className="columns is-vcentered">
        <div className="column">
          TODO: DashboardPage
        </div>
      </div>
    </div>
  </section>
  )
}
