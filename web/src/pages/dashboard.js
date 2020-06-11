import React, { Component } from 'react';
import DashboardLayout from 'layouts/dashboard-layout';
import HappeningService from 'services/happening-service'
import extend from 'lib/extend';
import ListHappeningsView from 'views/list-happenings';

export default class Dashboard extends Component {
  state = {
    happenings: []
  }

  componentDidMount () {
    HappeningService.list()
      .then(happenings => {
        this.setState(s => extend(s, { happenings }))
      })
  }

  render () {
    return (
      <DashboardLayout>
        <ListHappeningsView happenings={this.state.happenings} />
      </DashboardLayout>
    )
  }
}
