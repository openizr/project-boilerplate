/**
 * Copyright (c) ...
 * All rights reserved.
 */

import * as React from 'react';
import Message from 'scripts/components/Message';
import PropTypes, { InferProps } from 'prop-types';
import { getMessage, postMessage } from 'scripts/api';

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
  const submit = (): void => {
    postMessage('OK');
  };
  return (
    <section>
      <Message label={translate(label)} />
      <button type="button" onClick={submit}>Submit</button>
    </section>
  );
}

Home.propTypes = propTypes;
Home.displayName = 'Home';
