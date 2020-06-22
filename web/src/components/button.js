import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function Button (props) {
  return <button type="button" className={withModifiers("button", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </button>
}
