import React from 'react';
import DashboardLayout from 'layouts/dashboard-layout';
import AccountInfoView from 'views/account-info-view';

export default function Account () {
  return (
    <DashboardLayout>
      <AccountInfoView />
    </DashboardLayout>
  )
}
