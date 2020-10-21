/**
 * Copyright (c) ...
 * All rights reserved.
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
};

/**
 * Message.
 */
export default function Message(props: InferProps<typeof propTypes>): JSX.Element {
  const { label } = props;
  return (
    <div>{label}</div>
  );
}

Message.displayName = 'Message';
Message.propTypes = propTypes;
