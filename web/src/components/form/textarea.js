import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function Textarea (props) {
  return <textarea className={withModifiers("textarea", props)} type="text" {...reject(props, ...modifiers)} />
}
