import { Locale } from 'basx/i18n';
import React, { Suspense } from 'react';
import routes from 'scripts/store/routes';
import { useCombiner } from 'scripts/store';
import Loader from 'scripts/components/Loader';
import PropTypes, { InferProps } from 'prop-types';
import { RoutingContext } from 'diox/extensions/router';

type LazyComponent = () => Promise<{
  default: React.ComponentType<{
    locale: Locale;
  }>
}>;

const propTypes = {
  locale: PropTypes.instanceOf(Object).isRequired,
};

/**
 * App router.
 */
export default function Router(props: InferProps<typeof propTypes>): JSX.Element {
  const { locale } = props;
  const route = useCombiner('router', (newState: RoutingContext) => newState.route || '');

  let currentPage = null;
  if (routes[route] !== undefined) {
    const Component = React.lazy(routes[route] as LazyComponent);
    currentPage = <Component locale={locale} />;
  }

  return (
    <Suspense fallback={<Loader />}>
      {currentPage}
    </Suspense>
  );
}

Router.propTypes = propTypes;
Router.defaultProps = {};
Router.displayName = 'Router';
