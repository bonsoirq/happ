import React from 'react';
import addModifiers, { modifiers } from 'modifiers/color'
import reject from 'lib/reject';

export default function TextInput (props) {
  return <input className={addModifiers("input", props)} type="text" {...reject(props, ...modifiers)} >
    {props.children}
  </input>
}
