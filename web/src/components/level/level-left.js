import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function LevelLeft (props) {
  return <div className={withModifiers("level-left", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </div>
}