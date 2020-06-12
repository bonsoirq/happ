import React, { useContext } from 'react';
import AccountContext from 'contexts/account-context';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';

export default function AccountInfoView() {
  const { currentAccount } = useContext(AccountContext);
  return (
    <>
      <AccountInfoField title="Name" content={currentAccount.name} />
      <AccountInfoField title="E-mail" content={currentAccount.email} />
    </>
  )
}

function AccountInfoField({ title, content }) {
  return (
    <>
      <SmallTitle>{title}</SmallTitle>
      <SmallSubtitle>{content}</SmallSubtitle>
    </>
  )
}
