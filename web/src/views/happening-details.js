import React from 'react';
import Button from 'components/button';
import ModalCard from 'components/modal/modal-card';
import ModalCardHead from 'components/modal/modal-card-head';
import ModalCardContent from 'components/modal/modal-card-content';
import ModalCardFoot from 'components/modal/modal-card-foot';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';

export default function HappeningDetailsView ({happening, onClose}) {
  return <ModalCard>
    <ModalCardHead
      title={happening.name}
      onClose={onClose}
    />
    <ModalCardContent>
      <SmallTitle>{happening.agenda}</SmallTitle>
      <SmallSubtitle>{happening.description}</SmallSubtitle>
      <SmallSubtitle>{happening.organizerDescription}</SmallSubtitle>
    </ModalCardContent>
    <ModalCardFoot>
      <Button
        onClick={onClose}
      >
        Cancel
      </Button>
    </ModalCardFoot>
  </ModalCard>
}
