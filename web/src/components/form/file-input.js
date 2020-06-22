import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function FileInput (props) {
  return <input className={withModifiers("input", props)} type="file" {...reject(props, ...modifiers)}>
    {props.children}
  </input>
}
