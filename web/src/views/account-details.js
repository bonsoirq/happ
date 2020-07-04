import React, { useContext } from 'react';
import AccountContext from 'contexts/account-context';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';

export default function AccountDetailsView() {
  const { currentAccount } = useContext(AccountContext);
  return (
    <>
      <AccountDetailsField title="Name" content={currentAccount.name} />
      <AccountDetailsField title="E-mail" content={currentAccount.email} />
    </>
  )
}

function AccountDetailsField({ title, content }) {
  return (
    <>
      <SmallTitle>{title}</SmallTitle>
      <SmallSubtitle>{content}</SmallSubtitle>
    </>
  )
}
