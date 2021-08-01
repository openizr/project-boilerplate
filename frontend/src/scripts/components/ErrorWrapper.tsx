import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';

type State = { hasError: boolean; };
type ErrorHandler = (error: Error, errorInfo: { componentStack: string }) => void;
type Props = InferProps<typeof ErrorWrapper.propTypes> & { onError: ErrorHandler | null };

/**
 * Handles uncaught errors and displays a generic UI.
 */
export default class ErrorWrapper extends React.Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  static displayName = 'ErrorWrapper';

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    onError: PropTypes.func,
    fallback: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    onError: null,
    fallback: null,
    children: null,
  };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    const { onError } = this.props;
    if (onError !== null) {
      onError(error, errorInfo);
    }
  }

  render(): JSX.Element {
    const { hasError } = this.state;
    const { children, fallback } = this.props;
    return (hasError ? fallback : children) as JSX.Element;
  }
}
