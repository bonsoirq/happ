import React from 'react';
import DashboardLayout from 'layouts/dashboard-layout';
import AccountInfoView from 'views/account-info';

export default function Account () {
  return (
    <DashboardLayout>
      <AccountInfoView />
    </DashboardLayout>
  )
}
