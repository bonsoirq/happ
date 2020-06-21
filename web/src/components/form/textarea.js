import React from 'react';
import addModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function Textarea (props) {
  return <textarea className={addModifiers("textarea", props)} type="text" {...reject(props, ...modifiers)} />
}
