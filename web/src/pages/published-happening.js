import React, { Component } from 'react';
import Title from 'components/title'
import HappeningService from 'services/happening-service';
import extend from 'lib/extend';
import Image from 'components/image';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';
import PageNotFound from 'components/page-not-found';

export default class PublishedHappening extends Component {

  state = {
    loading: true,
    showPhoto: true,
    imagePath: null,
    happening: null
  }

  componentDidMount () {
    const { match: { params } } = this.props

    HappeningService
      .find(params.id)
      .then(happening => {
        const imagePath = `${process.env.REACT_APP_API_URL}/happenings/${happening.id}/image`
        this.setState(s => extend(s, { happening, loading: false, imagePath }), () => {

        })
      })
      .catch(() => {
        this.setState(s => extend(s, { loading: false }))
      })
  }

  render () {
    const { loading, happening } = this.state

    if (loading) {
      return (
        <section className="hero is-primary is-medium is-bold">
          <div className="hero-body">
            <div className="container is-vcentered">
              <div className="column">
                <Title>
                  Loading...
                </Title>
              </div>
              <div className="column">
                <progress className="progress is-small is-primary" max="100"></progress>
              </div>
            </div>
          </div>
        </section>
      )
    } else if (happening == null) {
      return <PageNotFound />
    } else {
      const { showPhoto, imagePath } = this.state
      return <section>
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              { showPhoto &&
                <Image
                  is3by1={true}
                  src={imagePath}
                  onError={this.hidePhoto}
                />
              }
              {/* TODO: Make it better looking and add share buttons. */}
              <SmallTitle>{happening.agenda}</SmallTitle>
              <SmallSubtitle>{happening.description}</SmallSubtitle>
              <SmallSubtitle>{happening.organizerDescription}</SmallSubtitle>
            </div>
          </div>
        </div>
      </section>
    }
  }

  hidePhoto() {
    this.setState(s => extend(s, { showPhoto: false }))
  }
}
