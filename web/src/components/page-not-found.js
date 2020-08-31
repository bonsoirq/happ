import React from 'react';

export default function PageNotFound({children}) {
  return <section className="hero is-primary is-bold is-fullheight-with-navbar has-text-centered">
    <div className="hero-body">
      <div className="container">
        <h1 className="title is-1">
          Error 404
        </h1>
        <h2 className="subtitle is-3">
          Page not found
        </h2>
      </div>
    </div>
  </section>
}
