import React from 'react';

export default function Label (props) {
  return <label className="label" {...props}>
    {props.children}
  </label>
}
