import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';
import Button from './button';

export default function SubmitButton (props) {
  return <Button
    type="submit"
    onClick={e => {
      e.preventDefault()
      props.onClick(e)
    }}
    className={withModifiers("button", props)}
    {...reject(props, ...modifiers)}
  >
    {props.children}
  </Button>
}
