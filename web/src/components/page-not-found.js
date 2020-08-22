import React from 'react';

export default function PageNotFound({children}) {
  return <section class="hero title is-1 is-primary is-bold is-fullheight-with-navbar" style={{ textAlign: 'center'}}>
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">
          Error 404
        </h1>
        <h2 class="subtitle is-3">
          Page not found
        </h2>
      </div>
    </div>
  </section>
}
