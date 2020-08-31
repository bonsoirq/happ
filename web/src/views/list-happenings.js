import React, { useState } from 'react';
import Table from 'components/table/table';
import Button from 'components/button';
import HappeningDetailsView from './happening-details';
import CreateHappeningView from './create-happening';
import { Link } from 'react-router-dom';
import Paths from 'paths';
import ellipsize from 'lib/ellipsize';

export default function ListHappeningsView(props) {
  const [showCreateHappeningModal, setShowCreateHappeningModal] = useState(false);
  const [detailsHappening, setDetailsHappening] = useState(null);

  return (<>
    <Table>
      <HappeningTableHeader onClick={() => setShowCreateHappeningModal(true)} />
      <tbody>
        {
          props.happenings.length === 0 &&
          <NoHappeningsRow onClick={() => setShowCreateHappeningModal(true)} />
        }
        {props.happenings.map(x => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{ellipsize(x.description, 50)}</td>
            <td>
              <Button
                isWarning={true}
                disabled={!x.isPublished}
              >
                <Link
                  to={Paths.Discover(x.id)}
                  style={ x.isPublished ? null : { pointerEvents: "none" } }
                >
                  See published
                </Link>
              </Button>
            </td>
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
      <th>Description</th>
      <th colSpan="2"></th>
      <th align="right">
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

function NoHappeningsRow({onClick}) {
  return (
    <tr>
      <td colSpan="5" style={{ textAlign: 'center' }}>
        You don't have any happenings
        <br />
        Add your first one using Create button
        <br />
        <br />
        <Button
          isPrimary={true}
          onClick={onClick}
        >
          Create
        </Button>
      </td>
    </tr>
  )
}
