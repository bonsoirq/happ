import React from 'react';
import { noop } from 'lib/noop';

export default function ModalCardHead (props) {
  const { title, onClose = noop } = props
  return <header className="modal-card-head">
    <p className="modal-card-title">{title}</p>
    <button className="delete" onClick={onClose} />
  </header>
}
