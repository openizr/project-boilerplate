/**
 * Copyright (c) ...
 * All rights reserved.
 */

import { i18n } from 'basx';
import React, { Suspense } from 'react';
import { store } from 'scripts/store';
import routes from 'scripts/store/routes';
import useStore from 'diox/connectors/react';
import PropTypes, { InferProps } from 'prop-types';

const [useCombiner] = useStore(store);

/* eslint-disable */
const propTypes = {
  locale: PropTypes.instanceOf(Object).isRequired,
};

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) { // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

/**
 * App router.
 */
export default function Router(props: InferProps<typeof propTypes>): JSX.Element {
  const [routing] = useCombiner('router', (newState) => newState);
  const { locale } = props;
  const { route } = routing;

  let Aea;
  let elem = <div />;
  if (routes[route] !== undefined) {
    Aea = React.lazy(routes[route] as any);
    elem = <Aea translate={i18n(locale as any)} />;
  }

  return (
    <section>
      <ErrorBoundary>
        <Suspense fallback={<div>LOADING...</div>}>
          {elem}
        </Suspense>
      </ErrorBoundary>
    </section >
  );
}

Router.propTypes = propTypes;
Router.defaultProps = {};
Router.displayName = 'Router';
