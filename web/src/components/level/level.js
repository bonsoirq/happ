import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function Level (props) {
  return <div className={withModifiers("level", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </div>
}