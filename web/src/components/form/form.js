import React from 'react';

export default function Form (props) {
  return <form
      onSubmit={e => {
        e.preventDefault()
        props.onSubmit(e)
      }}
    >
    {props.children}
  </form>
}
