import React from 'react';
import logo from 'images/logo-transparent.png';
import Title from 'components/title'
import Subtitle from 'components/subtitle'
import Registration from 'views/registration';

export default function Welcome () {
  return (
  <section>
    <div className="container">
      <div className="columns is-vcentered">
        <div className="column">
          <img src={logo} className="App-logo" alt="logo" height="800" width="800"/>
        </div>
        <div className="column">
          <Title>Welcome to happ</Title>
          <Subtitle>A tool for event organization</Subtitle>
          <Registration />
        </div>
      </div>
    </div>
  </section>
  )
}
