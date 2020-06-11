import React, { useState } from 'react';
import Table from 'components/table/table';
import Button from 'components/button';
import ModalCard from 'components/modal/modal-card';
import ModalCardHead from 'components/modal/modal-card-head';
import ModalCardContent from 'components/modal/modal-card-content';
import ModalCardFoot from 'components/modal/modal-card-foot';

export default function ListHappeningsView(props) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (<>
    <Table>
      <HappeningTableHeader />
      <tbody>
        {/* TODO: custom row for empty array */}
        {props.happenings.map(x => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.description}</td>
            <td>
              <Button>TODO: Details</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    {showDetailsModal &&
      <ModalCard>
        <ModalCardHead title="TODO: Title" onClose={() => setShowDetailsModal(false)} />
        <ModalCardContent>
          TODO: Happening details
        </ModalCardContent>
        <ModalCardFoot>
          <Button
            onClick={() => setShowDetailsModal(false)}
          >
            Cancel
          </Button>
        </ModalCardFoot>
      </ModalCard>
    }
  </>
  )
}

function HappeningTableHeader() {
  return <thead>
    <th>Name</th>
    <th>Description</th>
    <th></th>
  </thead>
}
