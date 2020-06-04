import React from 'react';
import addModifiers, { modifiers } from 'modifiers/color'
import reject from 'lib/reject';

export default function PasswordInput (props) {
  return <input className={addModifiers("input", props)} type="password" {...reject(props, ...modifiers)}>
    {props.children}
  </input>
}

