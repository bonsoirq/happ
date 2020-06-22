import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function Title(props) {
  return <h1 className={withModifiers("title", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </h1>
}
