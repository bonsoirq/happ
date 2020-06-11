import React, { useState } from 'react';
import Table from 'components/table/table';
import Button from 'components/button';
import HappeningDetailsView from './happening-details';
import ModalCard from 'components/modal/modal-card';
import ModalCardHead from 'components/modal/modal-card-head';
import ModalCardContent from 'components/modal/modal-card-content';
import ModalCardFoot from 'components/modal/modal-card-foot';

export default function ListHappeningsView(props) {
  const [showCreateHappeningModal, setShowCreateHappeningModal] = useState(false);
  const [selectedDetailsHappening, selectDetailsHappening] = useState(null);

  return (<>
    <Table>
      <HappeningTableHeader onClick={() => setShowCreateHappeningModal(true)} />
      <tbody>
        {/* TODO: custom row for empty array */}
        {props.happenings.map(x => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.description}</td>
            <td>
              <Button
                onClick={() => selectDetailsHappening(x)}
              >
                Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    {
      selectedDetailsHappening != null &&
      <HappeningDetailsView
        happening={selectedDetailsHappening}
        onClose={() => selectDetailsHappening(null)}
      />
    }
    {
      showCreateHappeningModal &&
      <ModalCard>
        <ModalCardHead
          title="Create new happening"
          onClose={() => setShowCreateHappeningModal(false)}
        />
        <ModalCardContent>
          TODO: Form
        </ModalCardContent>
        <ModalCardFoot>
          <Button
            onClick={() => setShowCreateHappeningModal(false)}
          >
            Cancel
          </Button>
        </ModalCardFoot>
      </ModalCard>
    }
  </>
  )
}

function HappeningTableHeader({onClick}) {
  return <thead>
    <th>Name</th>
    <th>Description</th>
    <th>
      <Button
        onClick={onClick}
      >
        Create
      </Button>
    </th>
  </thead>
}
