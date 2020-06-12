import React, { Component } from 'react';
import DashboardLayout from 'layouts/dashboard-layout';
import HappeningService from 'services/happening-service'
import extend from 'lib/extend';
import ListHappeningsView from 'views/list-happenings';

export default class Dashboard extends Component {
  state = {
    happenings: [],
    createHappeningState: {
      name: null,
      description: null,
      organizerDescription: null,
      agenda: null,
      loading: false,
      errors: {}
    }
  }

  componentDidMount () {
    this.listHappenings()
  }

  listHappenings = () => {
    HappeningService.list()
      .then(happenings => {
        this.setState(s => extend(s, { happenings }))
      })
  }

  removeHappening = (happening) => {
    const { id } = happening
    HappeningService.remove(id)
      .then(() => {
        this.listHappenings()
      })
  }

  render () {
    return (
      <DashboardLayout>
        <ListHappeningsView
          happenings={this.state.happenings}
          onCreateHappening={this.listHappenings}
          onRemoveHappening={this.removeHappening}
        />
      </DashboardLayout>
    )
  }
}
