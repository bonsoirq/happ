import React from 'react';
import HelpText from 'components/help-text';

export default function Validation (props) {
  const { error } = props
  return <> { error != null &&
    <HelpText isDanger={true}>{error}</HelpText>
  }
  </>
}
