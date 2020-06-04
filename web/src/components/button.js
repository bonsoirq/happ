import React from 'react';
import addModifiers, { modifiers } from 'modifiers/color'
import reject from 'lib/reject';

export default function Button (props) {
  return <button type="button" className={addModifiers("button", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </button>
}
