/**
 * Copyright (c) ...
 * All rights reserved.
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';

/**
 * Catches global errors and displays a generic UI.
 */
export default class ErrorBoundary extends React.Component<unknown, { hasError: boolean }> {
  // eslint-disable-next-line react/static-property-placement
  static displayName = 'ErrorBoundary';

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    children: null,
  };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  constructor(props: InferProps<typeof ErrorBoundary.propTypes>) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    console.error(error, errorInfo); // eslint-disable-line no-console
  }

  render(): JSX.Element {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError === true) {
      return <h1>Something went wrong.</h1>;
    }
    return children as JSX.Element;
  }
}
