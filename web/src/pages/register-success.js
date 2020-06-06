import React, { useEffect } from 'react';
import Title from 'components/title'
import Subtitle from 'components/subtitle'
import { withRouter } from 'react-router-dom';

export default withRouter(RegisterSuccess)
function RegisterSuccess (props) {
  useEffect(() => {
    const TIME_TILL_REDIRECT_IN_MS = 10_000
    const timeout = setTimeout(() => {
      props.history.push("/login")
    }, TIME_TILL_REDIRECT_IN_MS)
    return () => clearTimeout(timeout)
  })

  return (
  <section className="hero is-primary is-medium is-bold">
    <div className="hero-body">
      <div className="container is-vcentered">
        <div className="column">
          <Title>
            Thank you!
          </Title>
          <Subtitle>
            If your email wasn't taken new account has been created.
          </Subtitle>
          <Subtitle>
            We will redirect you automatically to the login page shortly.
          </Subtitle>
        </div>
        <div className="column">
          <progress class="progress is-small is-primary" max="100"></progress>
        </div>
      </div>
    </div>
  </section>
  )
}
