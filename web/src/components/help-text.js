import React from 'react';
import addModifiers, { modifiers } from 'modifiers/color'
import reject from 'lib/reject';

export default function HelpText (props) {
  return <p className={addModifiers("help", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </p>
}
