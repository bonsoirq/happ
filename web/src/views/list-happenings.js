import React, { useState } from 'react';
import Table from 'components/table/table';
import Button from 'components/button';
import HappeningDetailsView from './happening-details';
import CreateHappeningView from './create-happening';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';

export default function ListHappeningsView(props) {
  const [showCreateHappeningModal, setShowCreateHappeningModal] = useState(false);
  const [selectedDetailsHappening, selectDetailsHappening] = useState(null);

  return (<>
    <Table>
      <HappeningTableHeader onClick={() => setShowCreateHappeningModal(true)} />
      <tbody>
        {
          props.happenings.length === 0 &&
          <NoHappeningsRow />
        }
        {props.happenings.map(x => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.description}</td>
            <td>
              <Button
                isInfo={true}
                onClick={() => selectDetailsHappening(x)}
              >
                Details
              </Button>
            </td>
            <td>
              <Button
                isDanger={true}
                onClick={() => props.onRemoveHappening(x)}
              >
                Remove
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
      <CreateHappeningView
        onCreate={props.onCreateHappening}
        onClose={() => setShowCreateHappeningModal(false)}
      />
    }
  </>
  )
}

function HappeningTableHeader({onClick}) {
  return <thead>
    <th>Name</th>
    <th colSpan="2">Description</th>
    <th>
      <Button
        isPrimary={true}
        onClick={onClick}
      >
        Create
      </Button>
    </th>
  </thead>
}

function NoHappeningsRow() {
  return (
    <>
      <SmallTitle>You don't have any happenings</SmallTitle>
      <SmallSubtitle>Add your first using Create button</SmallSubtitle>
    </>
  )
}
