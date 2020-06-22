import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function TextInput (props) {
  return <input className={withModifiers("input", props)} type="text" {...reject(props, ...modifiers)} >
    {props.children}
  </input>
}
