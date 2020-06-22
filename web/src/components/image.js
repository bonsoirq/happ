import React from 'react';
import withModifiers, { modifiers } from 'modifiers'
import reject from 'lib/reject';

export default function Image (props) {
  const { src, alt } = props
  return <figure className={withModifiers("image", props)} {...reject(props, ...modifiers)}>
    <img src={src} alt={alt} />
  </figure>
}
