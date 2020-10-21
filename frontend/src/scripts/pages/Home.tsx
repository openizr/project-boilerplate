/**
 * Copyright (c) ...
 * All rights reserved.
 */

import * as React from 'react';
import getMessage from 'scripts/api';
import PropTypes, { InferProps } from 'prop-types';
import Message from 'scripts/components/Message';

const propTypes = {
  translate: PropTypes.func.isRequired,
};

/**
 * Home page.
 */
export default function Home(props: InferProps<typeof propTypes>): JSX.Element {
  const { translate } = props;
  const [label, setLabel] = React.useState('WAITING...');
  React.useEffect(() => {
    getMessage().then((response) => {
      setLabel(response.message);
    });
  }, []);
  return (
    <Message label={translate(label)} />
  );
}

Home.propTypes = propTypes;
Home.displayName = 'Home';
