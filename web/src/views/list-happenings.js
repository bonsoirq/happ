import React, { useState } from 'react';
import Table from 'components/table/table';
import Button from 'components/button';
import HappeningDetailsView from './happening-details';

export default function ListHappeningsView(props) {
  const [selectedDetailsHappening, selectDetailsHappening] = useState(null);

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
