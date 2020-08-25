import React, { Component } from 'react';
import Title from 'components/title'
import HappeningService from 'services/happening-service';
import extend from 'lib/extend';
import Image from 'components/image';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';
import PageNotFound from 'components/page-not-found';
import Button from 'components/button';
import Level from 'components/level/level';
import LevelLeft from 'components/level/level-left';
import LevelRight from 'components/level/level-right';

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
      return <section style={{ whiteSpace: 'pre-line'}}>
        <div className="container">
          <section className="hero is-primary">
            <div className="hero-body">
              <Level>
                <LevelLeft>
                  <Title>{happening.name}</Title>
                </LevelLeft>
                <LevelRight>
                  <Button isInfo={true}>Share</Button>
                </LevelRight>
              </Level>
            </div>
          </section>
          <br />
          { showPhoto &&
            <Image
              is3by1={true}
              src={imagePath}
              onError={this.hidePhoto}
            />
          }
          <br /><br />
          <div className="columns">
            <div className="column is-one-third">
              <div className="notification is-primary is-light">
                <SmallTitle>Agenda</SmallTitle>
                <p className="is-size-6">{happening.agenda}</p>
              </div>
            </div>
            <div className="column">
              <SmallTitle>Description</SmallTitle>
              <SmallSubtitle>{happening.description}</SmallSubtitle>
              <br />
              <SmallTitle>About host</SmallTitle>
              <SmallSubtitle>{happening.organizerDescription}</SmallSubtitle>
            </div>
          </div>
        </div>
      </section>
    }
  }

  hidePhoto = () => {
    this.setState(s => extend(s, { showPhoto: false }))
  }
}
