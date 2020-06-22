import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function HelpText (props) {
  return <p className={withModifiers("help", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </p>
}
