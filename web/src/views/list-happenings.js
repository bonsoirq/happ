import React, { useState, useEffect } from 'react';
import Table from 'components/table/table';
import Button from 'components/button';
import HappeningDetailsView from './happening-details';
import CreateHappeningView from './create-happening';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';
import CreateHappeningImageView from './create-happening-image';
import { noop } from 'lib/noop';

export default function ListHappeningsView(props) {
  const [showCreateHappeningModal, setShowCreateHappeningModal] = useState(false);
  const [detailsHappening, setDetailsHappening] = useState(null);
  const [imageHappening, setImageHappening] = useState(null);

  useEffect(() => {
    setImageHappening(props.happenings[0])
    return noop
  }, [props.happenings]);

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
                onClick={() => setDetailsHappening(x)}
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
      detailsHappening != null &&
      <HappeningDetailsView
        happening={detailsHappening}
        onClose={() => setDetailsHappening(null)}
      />
    }
    {
      imageHappening != null &&
      <CreateHappeningImageView
        happeningId={imageHappening.id}
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
    <tr>
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
    </tr>
  </thead>
}

function NoHappeningsRow() {
  // TODO: <h1> cannot appear as a child of <tbody>
  return (
    <>
      <SmallTitle>You don't have any happenings</SmallTitle>
      {/* TODO: It would be nice if we could embedd create button here as well. */}
      <SmallSubtitle>Add your first using Create button</SmallSubtitle>
    </>
  )
}
