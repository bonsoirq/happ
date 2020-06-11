import React from 'react';

export default function ModalCard (props) {
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        {props.children}
      </div>
    </div>
  )
}
