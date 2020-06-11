import React, { useContext } from 'react';
import AccountContext from 'contexts/account-context';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';

export default function AccountInfoView() {
  const { currentAccount } = useContext(AccountContext);
  return (
    <div>
      <AccountInfoField title="Name" content={currentAccount.name} />
      <AccountInfoField title="E-mail" content={currentAccount.email} />
    </div>
  )
}

function AccountInfoField({ title, content }) {
  return (
    <div>
      <SmallTitle>{title}</SmallTitle>
      <SmallSubtitle>{content}</SmallSubtitle>
    </div>
  )
}
