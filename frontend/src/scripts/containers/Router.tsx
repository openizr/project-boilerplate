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
import ErrorBoundary from 'scripts/components/ErrorBoundary';

type LazyComponent = () => Promise<{ default: React.ComponentType<{ translate: () => string }> }>;

const [useCombiner] = useStore(store);

const propTypes = {
  locale: PropTypes.instanceOf(Object).isRequired,
};

/**
 * App router.
 */
export default function Router(props: InferProps<typeof propTypes>): JSX.Element {
  const [routing] = useCombiner('router', (newState) => newState);
  const { locale } = props;
  const { route } = routing;

  let currentPage = null;
  if (routes[route] !== undefined) {
    const Component = React.lazy(routes[route] as LazyComponent);
    currentPage = <Component translate={i18n(locale as Record<string, string>)} />;
  }

  return (
    <section>
      <ErrorBoundary>
        <Suspense fallback={<div>LOADING...</div>}>
          {currentPage}
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

Router.propTypes = propTypes;
Router.defaultProps = {};
Router.displayName = 'Router';
