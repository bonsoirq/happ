import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function LevelRight (props) {
  return <div className={withModifiers("level-right", props)} {...reject(props, ...modifiers)}>
    {props.children}
  </div>
}