import * as React from 'react';
import Message from 'scripts/components/Message';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  locale: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

/**
 * Home page.
 */
export default function Home(props: InferProps<typeof propTypes>): JSX.Element {
  const { locale } = props;

  return (
    <Message label={locale.LABEL_TEST} />
  );
}

Home.propTypes = propTypes;
Home.defaultProps = {};
Home.displayName = 'Home';
