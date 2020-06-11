import React from 'react';
import addModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function Title(props) {
  return <h1 className={addModifiers("title", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </h1>
}
