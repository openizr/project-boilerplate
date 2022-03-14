import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  locale: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

/**
 * Not Found page.
 */
export default function NotFound(props: InferProps<typeof propTypes>): JSX.Element {
  const { locale } = props;

  return (
    <div>
      Not Found.
      {typeof locale}
    </div>
  );
}

NotFound.propTypes = propTypes;
NotFound.defaultProps = {};
NotFound.displayName = 'NotFound';
