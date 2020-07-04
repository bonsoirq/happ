import React from 'react';
import DashboardLayout from 'layouts/dashboard-layout';
import AccountDetailsView from 'views/account-details';

export default function Account () {
  return (
    <DashboardLayout>
      <AccountDetailsView />
    </DashboardLayout>
  )
}
