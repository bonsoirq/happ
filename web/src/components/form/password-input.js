import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function PasswordInput (props) {
  return <input className={withModifiers("input", props)} type="password" {...reject(props, ...modifiers)}>
    {props.children}
  </input>
}
