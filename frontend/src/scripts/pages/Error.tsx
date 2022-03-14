import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  locale: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

/**
 * Error page.
 */
export default function Error(props: InferProps<typeof propTypes>): JSX.Element {
  const { locale } = props;

  return (
    <div>
      Error.
      {typeof locale}
    </div>
  );
}

Error.propTypes = propTypes;
Error.defaultProps = {};
Error.displayName = 'Error';
