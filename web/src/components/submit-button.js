import React from 'react';
import addModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';
import Button from './button';

export default function SubmitButton (props) {
  return <Button
    type="submit"
    onClick={e => {
      e.preventDefault()
      props.onClick(e)
    }}
    className={addModifiers("button", props)}
    {...reject(props, ...modifiers)}
  >
    {props.children}
  </Button>
}
